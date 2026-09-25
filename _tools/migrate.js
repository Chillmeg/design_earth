// One-off migration: reads _archive-original/ and writes the Jekyll content.
//   node _tools/migrate.js
// Output: _projects/ _publications/ _exhibitions/ (*.md), assets/images/<collection>/<slug>/,
//         files/download/ (PDFs), _data/order.yml, index.md, _tools/migrate-report.txt
// Re-running overwrites generated files; hand edits to those files would be lost.
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const AR = path.join(ROOT, '_archive-original');
const SITE = path.join(AR, 'design-earth.org');
const AJAX = path.join(AR, '_ajax');
const report = [];

const read = (p) => fs.readFileSync(p, 'utf8');
const q = (s) => JSON.stringify(s); // YAML-safe double-quoted string
const decodeEnt = (s) => s.replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n)).replace(/&amp;/g, '&');
const fileName = (src) => {
  let n = decodeEnt(src).split('/').pop();
  try { n = decodeURIComponent(n); } catch {}
  return n;
};

// ---------- locate archived image files ----------
const dirCache = {};
const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
function findFile(name, sub = 'gimgs') {
  const cands = [
    path.join(SITE, 'files', sub, name),
    path.join(AJAX, 'files', sub, name),
    path.join(AJAX, 'files', sub, name.replace(/[:*?"<>|]/g, '_')),
  ];
  for (const c of cands) if (fs.existsSync(c)) return c;
  for (const d of [path.join(SITE, 'files', sub), path.join(AJAX, 'files', sub)]) {
    if (!fs.existsSync(d)) continue;
    dirCache[d] = dirCache[d] || fs.readdirSync(d);
    const hit = dirCache[d].find((f) => norm(f) === norm(name));
    if (hit) return path.join(d, hit);
  }
  return null;
}

function copyImage(name, slug, dest, sub) {
  const src = findFile(name, sub);
  const outDir = path.join(ROOT, 'assets', 'images', slug);
  fs.mkdirSync(outDir, { recursive: true });
  if (!src) { report.push(`MISSING image ${sub}/${name} -> assets/images/${slug}/${dest}`); return false; }
  fs.copyFileSync(src, path.join(outDir, dest));
  return true;
}
const ext = (name) => (path.extname(name) || '.jpg').toLowerCase().replace('.jpeg', '.jpg');
const pad = (i) => String(i + 1).padStart(2, '0');

// ---------- links & body text ----------
const HOST = /^https?:\/\/(www\.)?design-earth\.org(:\d+)?/i;
function rewriteHref(href, permalink) {
  const raw = decodeEnt(href);
  if (/^(mailto:|#)/.test(raw)) return raw;
  let abs;
  if (HOST.test(raw)) abs = raw.replace(HOST, '');
  else if (/^[a-z]+:/i.test(raw)) return raw; // external
  else abs = new URL(raw, 'https://x' + permalink).pathname; // wget-relative
  abs = abs.replace(/index\.html$/, '');
  if (!abs.startsWith('/files/') && !abs.endsWith('/') && !path.extname(abs)) abs += '/';
  const from = permalink.endsWith('/') ? permalink : permalink + '/';
  let rel = path.posix.relative(from, abs) || '.';
  if (abs.endsWith('/') && !rel.endsWith('/')) rel += '/';
  if (rel === './') rel = './';
  return rel;
}

function convertInline(html, permalink) {
  // links
  html = html.replace(/<a\s+([^>]*)>([\s\S]*?)<\/a>/gi, (m, attrs, text) => {
    const at = {};
    attrs.replace(/(\w+)\s*=\s*(["'])(.*?)\2/g, (_, k, __, v) => (at[k.toLowerCase()] = v));
    if (!at.href) return m;
    const href = rewriteHref(at.href, permalink);
    const extra = Object.keys(at).filter((k) => k !== 'href' && at[k] !== '');
    const simpleText = !/[<\[\]]/.test(text) && text.trim() === text && text.length;
    if (!extra.length && simpleText && !/[\s()]/.test(href)) return `[${text}](${href})`;
    const rest = extra.map((k) => ` ${k}="${at[k]}"`).join('');
    return `<a href="${href}"${rest}>${text}</a>`;
  });
  // bold / italic -> markdown only when clean
  html = html.replace(/<(strong|b)>([^<*\n]*?)<\/\1>/gi, (m, t, x) => (x && x.trim() === x ? `**${x}**` : m));
  html = html.replace(/<(em|i)>([^<*\n]*?)<\/\1>/gi, (m, t, x) => (x && x.trim() === x ? `*${x}*` : m));
  return html;
}

function escapeText(html) {
  // escape markdown/kramdown-sensitive characters in text nodes, before any markup conversion
  return html.split(/(<[^>]+>)/).map((part, i) => {
    if (i % 2) return part;
    return part.replace(/\*/g, '\\*').replace(/_/g, '\\_').replace(/\.\.\./g, '\\.\\.\\.').replace(/--/g, '\\-\\-');
  }).join('');
}

function htmlToBody(html, permalink) {
  html = html.replace(/\r/g, '').trim();
  if (/<div/i.test(html)) report.push(`WARN nested div in text of ${permalink}`);
  const paras = [];
  const re = /<p[^>]*>([\s\S]*?)(?:<\/p>|(?=<p[\s>])|$)/gi;
  let m;
  let any = false;
  while ((m = re.exec(html))) {
    any = true;
    if (m[0] === '') { re.lastIndex++; continue; }
    paras.push(m[1]);
  }
  if (!any && html) paras.push(html);
  return paras
    .map((p) => {
      p = convertInline(escapeText(p), permalink);
      p = p.replace(/\s*<br\s*\/?>\s*/gi, '<br>\n').replace(/(<br>\n)+$/, '').trim();
      return p.split('\n').map((l) => l.trim()).join('\n');
    })
    .filter((p) => p.replace(/&nbsp;|\s/g, '') !== '')
    .join('\n\n');
}

function yearOf(text) {
  const em = (text.match(/<em>([\s\S]*?)<\/em>/) || [])[1] || '';
  const y = (em.match(/\b(19[5-9]\d|20[0-4]\d)\b/g) || text.match(/\b(19[5-9]\d|20[0-4]\d)\b/g) || [])[0];
  return y ? +y : null;
}

// ---------- archive helpers ----------
const pagesIndex = JSON.parse(read(path.join(AJAX, 'pages-index.json')));
const growIndex = JSON.parse(read(path.join(AJAX, 'grow-index.json')));
const imgAttrs = (tag) => ({
  src: (tag.match(/src=\\?["']([^"'\\]*)/) || [])[1],
  width: +(tag.match(/width=\\?["'](\d+)/) || [])[1] || null,
  height: +(tag.match(/height=\\?["'](\d+)/) || [])[1] || null,
});

function slideImages(rel, html) {
  const first = html.match(/<div id="slide1000"[\s\S]*?(<img[^>]*>)/);
  if (!first) return [];
  const imgs = [imgAttrs(first[1])];
  const ids = (pagesIndex[rel] && pagesIndex[rel].ids) || [];
  for (const id of ids.slice(1)) {
    const j = JSON.parse(read(path.join(AJAX, 'slides', `${id}.json`)));
    const tag = (j.output.match(/<img[^>]*>/) || [])[0];
    if (tag) imgs.push(imgAttrs(tag));
    else report.push(`WARN slide ${id} (${rel}) has no <img>`);
  }
  return imgs;
}

function growImages(rel, html) {
  const out = [];
  for (const m of html.matchAll(/<div class='picture_holder' id='node(\d+)'[\s\S]*?(<img[^>]*>)/g)) {
    const thumb = imgAttrs(m[2]);
    const g = path.join(AJAX, 'grow', `${m[1]}.html`);
    const full = fs.existsSync(g) ? imgAttrs((read(g).match(/<img[^>]*>/) || [''])[0]) : {};
    out.push({ thumb, full });
  }
  return out;
}

// ---------- sections ----------
const SECTIONS = [
  { dir: 'projects', coll: 'projects' },
  { dir: 'publications', coll: 'publications' },
  { dir: 'exhibitions', coll: 'exhibitions' },
];
// animations are new (not in the archive); their files in _animations/ are hand-written
const order = {
  projects: [], publications: [], exhibitions: [],
  animations: ['a-pas-de-loup', 'a-whale-song', 'elephant-in-the-room', 'the-way-of-the-dinosaurs',
    '800-pounds-gorilla', 'crocodile-tears', 'living-as-flamingo'],
};

function slugFor(url) {
  // url is an archive path like "projects/cosmorama/" or "project/the-belly-of-a-mountain/"
  if (url === 'publications/geographies-of-trash/2/') return 'geographies-of-trash-book';
  return url.split('/').filter(Boolean).pop();
}

for (const sec of SECTIONS) {
  const gridHtml = read(path.join(SITE, sec.dir, 'index.html'));
  // grid tiles: href -> thumbnail
  const tiles = {};
  for (const m of gridHtml.matchAll(/<a href='([^']*)' class='link'[^>]*><img[^>]*src='([^']*)' width='(\d+)' height='(\d+)'/g)) {
    const url = new URL(m[1].replace(/index\.html$/, ''), `https://x/${sec.dir}/`).pathname.slice(1).replace(/^(.*[^/])$/, '$1/');
    tiles[url] = { src: m[2], w: +m[3], h: +m[4] };
  }
  // nav order from any item page's subsection list
  const itemDir = fs.readdirSync(path.join(SITE, sec.dir)).find((d) => {
    const f = path.join(SITE, sec.dir, d, 'index.html');
    return fs.existsSync(f) && read(f).includes("class='subsection'");
  });
  const navHtml = read(path.join(SITE, sec.dir, itemDir, 'index.html'));
  const navUrls = [...navHtml.matchAll(/class='exhibit_title[^']*'><a href='([^']*)'/g)].map((m) =>
    new URL(m[1].replace(/index\.html$/, ''), `https://x/${sec.dir}/${itemDir}/`).pathname.slice(1));

  const outDir = path.join(ROOT, `_${sec.coll}`);
  fs.mkdirSync(outDir, { recursive: true });

  for (const url of navUrls) {
    const rel = url + 'index.html';
    const html = read(path.join(SITE, rel));
    const slug = slugFor(url);
    const defaultLink = `/${sec.coll}/${slug}/`;
    const permalink = '/' + url;
    const title = decodeEnt((html.match(/<title>(.*?) : DESIGN EARTH<\/title>/) || [])[1] || slug);
    const isSlideshow = /format-slideshow/.test(html);
    order[sec.coll].push(slug);

    // text
    let textHtml = '';
    const ts = html.match(/<div id='textspace' class='placement-\w+'>([\s\S]*?)<\/div>/);
    if (ts) textHtml = ts[1];
    else {
      const g = html.match(/<div style='clear: left;'><!-- --><\/div><\/div>([\s\S]*?)<!-- end text and image -->/);
      if (g) textHtml = g[1];
    }
    const body = htmlToBody(textHtml, permalink);
    const year = yearOf(textHtml);

    // images
    const fm = [];
    fm.push(`title: ${q(title)}`);
    if (permalink !== defaultLink) fm.push(`permalink: ${permalink}`);
    fm.push(year ? `year: ${year}  # guessed from the text - please check` : `year:  # unknown - please fill in`);
    // collection defaults (_config.yml): publications -> grow, others -> slideshow
    if (isSlideshow && sec.coll === 'publications') fm.push('layout: slideshow');
    if (!isSlideshow && sec.coll !== 'publications') fm.push('layout: grow');
    if (isSlideshow && pagesIndex[rel] && pagesIndex[rel].ids && !html.includes("id='slideshow-nav'"))
      fm.push('slideshow_nav: false  # hide the "1 of N  Previous | Next" line');

    const tile = tiles[url];
    if (tile) {
      const tn = 'thumb' + ext(fileName(tile.src));
      copyImage(fileName(tile.src), `${sec.coll}/${slug}`, tn, 'dimgs');
      fm.push(`thumbnail: ${tn}`);
      if (sec.coll === 'publications') fm.push(`thumbnail_height: ${tile.h}`);
    } else {
      fm.push('in_grid: false  # listed in the nav only, no tile on the grid page');
    }

    const imgs = [];
    if (isSlideshow) {
      const slides = slideImages(rel, html);
      const missingSlot = slug === 'geographies-of-trash-book';
      slides.forEach((s, i) => {
        const name = fileName(s.src);
        const dest = pad(i) + ext(name);
        const ok = copyImage(name, `${sec.coll}/${slug}`, dest, 'gimgs');
        let y = `  - file: ${dest}`;
        if (!ok) y += `  # MISSING - original file "${name}" is 404 on the old site; drop it into assets/images/${sec.coll}/${slug}/ as ${dest}`;
        imgs.push(y);
        if (s.width && s.height) imgs.push(`    width: ${s.width}`, `    height: ${s.height}`);
        if (missingSlot && ok) report.push(`NOTE ${slug} image ${name} was found`);
      });
    } else {
      growImages(rel, html).forEach((g, i) => {
        const fullName = fileName(g.full.src || g.thumb.src.replace('/th-', '/'));
        const thumbName = fileName(g.thumb.src);
        const dest = pad(i) + ext(fullName);
        const tdest = pad(i) + '-thumb' + ext(thumbName);
        copyImage(fullName, `${sec.coll}/${slug}`, dest, 'gimgs');
        copyImage(thumbName, `${sec.coll}/${slug}`, tdest, 'gimgs');
        imgs.push(`  - file: ${dest}`);
        if (g.full.width) imgs.push(`    width: ${g.full.width}`, `    height: ${g.full.height}`);
        imgs.push(`    thumb: ${tdest}`);
        if (g.thumb.width) imgs.push(`    thumb_width: ${g.thumb.width}`, `    thumb_height: ${g.thumb.height}`);
      });
    }
    if (imgs.length) fm.push('images:', ...imgs);
    else fm.push('images: []  # empty page on the old site');

    fs.writeFileSync(path.join(outDir, `${slug}.md`), `---\n${fm.join('\n')}\n---\n${body}\n`);
  }
  report.push(`${sec.coll}: ${navUrls.length} items`);
}

// ---------- home ----------
{
  const html = read(path.join(SITE, 'index.html'));
  const ts = html.match(/<div id='textspace' class='placement-top'>([\s\S]*?)<\/div>/)[1];
  const s = slideImages('index.html', html)[0];
  const name = fileName(s.src);
  copyImage(name, 'home', '01' + ext(name), 'gimgs');
  fs.writeFileSync(path.join(ROOT, 'index.md'),
    `---\nlayout: home\ntitle: MAIN\nredirect_from:\n  - /xml/\nimages:\n  - file: 01${ext(name)}\n    width: ${s.width}\n    height: ${s.height}\n---\n${htmlToBody(ts, '/')}\n`);
}

// ---------- PDFs ----------
{
  const src = path.join(AJAX, 'files', 'download');
  const dst = path.join(ROOT, 'files', 'download');
  fs.mkdirSync(dst, { recursive: true });
  for (const f of fs.readdirSync(src)) fs.copyFileSync(path.join(src, f), path.join(dst, f));
  report.push(`pdfs: ${fs.readdirSync(src).length}`);
}

// ---------- order ----------
{
  const lines = [
    '# Order of items in each section, top to bottom (nav list and grid page).',
    '# Use the file name without .md. Move a line to reorder.',
    '# Items NOT listed here are shown at the top automatically.',
    '',
  ];
  for (const k of Object.keys(order)) {
    lines.push(`${k}:`);
    if (!order[k].length) lines.push('  []');
    for (const s of order[k]) lines.push(`  - ${s}`);
    lines.push('');
  }
  fs.mkdirSync(path.join(ROOT, '_data'), { recursive: true });
  fs.writeFileSync(path.join(ROOT, '_data', 'order.yml'), lines.join('\n'));
}

fs.writeFileSync(path.join(__dirname, 'migrate-report.txt'), report.join('\n') + '\n');
console.log(report.join('\n'));
