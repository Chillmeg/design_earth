// Page-by-page comparison of the new site against the archive.
//   node _tools/compare.js [baseURL]      (default https://chillmeg.github.io/design_earth)
// For each archived page: title, text, image count, nav item list and grid tiles must match,
// and every image/link on the new page must load. Writes _tools/compare-report.txt.
const fs = require('fs');
const path = require('path');

const BASE = (process.argv[2] || 'https://chillmeg.github.io/design_earth').replace(/\/$/, '');
const AR = path.join(__dirname, '..', '_archive-original');
const SITE = path.join(AR, 'design-earth.org');
const pagesIndex = JSON.parse(fs.readFileSync(path.join(AR, '_ajax', 'pages-index.json'), 'utf8'));

const decode = (s) => s
  .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n))
  .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)))
  .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&apos;/g, "'")
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const text = (html) => decode((html || '').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();

function parts(html) {
  const title = ((html.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '').trim();
  let body = (html.match(/<div id='textspace'[^>]*>([\s\S]*?)<\/div>/) || [])[1];
  if (body == null) body = (html.match(/<div style='clear: left;'><!-- --><\/div><\/div>([\s\S]*?)<!-- end text and image -->/) || [])[1];
  const nav = [...html.matchAll(/class='exhibit_title[^']*'><a [^>]*>([\s\S]*?)<\/a>/g)].map((m) => text(m[1]));
  const tiles = [...html.matchAll(/<div class='captioning'><div class='title'>([\s\S]*?)<\/div>/g)].map((m) => text(m[1]));
  const grow = (html.match(/grower\(this, true\)/g) || []).length;
  const slidesVar = html.match(/var slides = (\[[\s\S]*?\]);/);
  let slides = null;
  if (slidesVar) { try { slides = (0, eval)(slidesVar[1]); } catch { slides = 'unparsable'; } }
  const hasSlide = /id="slide1000"/.test(html);
  const sections = [...html.matchAll(/class='section_title[^']*'>(?:<a [^>]*>)?([A-Z]+)/g)].map((m) => m[1]);
  return { title, body: text(body), nav, tiles, grow, slides, hasSlide, sections };
}

const cache = {};
async function status(url) {
  if (cache[url]) return cache[url];
  let s;
  try { s = (await fetch(url, { method: 'GET' })).status; } catch (e) { s = 'ERR ' + e.message; }
  return (cache[url] = s);
}

function walk(d, o = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory() && e.name !== 'ndxzsite' && e.name !== 'files') walk(p, o);
    else if (e.name === 'index.html') o.push(p);
  }
  return o;
}

(async () => {
  const out = [];
  let ok = 0, bad = 0;
  for (const f of walk(SITE).sort()) {
    const rel = path.relative(SITE, f).replace(/\\/g, '/');
    const urlPath = '/' + rel.replace(/index\.html$/, '');
    const oldHtml = fs.readFileSync(f, 'utf8');
    const res = await fetch(BASE + urlPath);
    const issues = [];
    if (res.status !== 200) issues.push(`HTTP ${res.status}`);
    const newHtml = await res.text();
    if (urlPath === '/xml/') {
      if (!/http-equiv="refresh"|Redirecting/.test(newHtml)) issues.push('no redirect to /');
      out.push(`${issues.length ? 'FAIL' : 'ok  '} ${urlPath}${issues.length ? '\n     - ' + issues.join('\n     - ') : ''}`);
      issues.length ? bad++ : ok++;
      continue;
    }
    const a = parts(oldHtml), b = parts(newHtml);

    if (a.title !== b.title) issues.push(`title: "${a.title}" -> "${b.title}"`);
    if (a.body !== b.body) {
      let i = 0; while (i < a.body.length && a.body[i] === b.body[i]) i++;
      issues.push(`text differs at char ${i}:\n       old: …${a.body.slice(Math.max(0, i - 40), i + 60)}…\n       new: …${b.body.slice(Math.max(0, i - 40), i + 60)}…`);
    }
    const oldCount = a.grow || (pagesIndex[rel] && pagesIndex[rel].ids ? pagesIndex[rel].ids.length : (a.hasSlide ? 1 : 0));
    const newCount = b.grow || (Array.isArray(b.slides) ? b.slides.length : (b.hasSlide ? 1 : 0));
    if (oldCount !== newCount) issues.push(`images: ${oldCount} -> ${newCount}`);
    if (a.nav.join('|') !== b.nav.join('|')) issues.push(`nav list: [${a.nav.join(', ')}]\n       -> [${b.nav.join(', ')}]`);
    if (a.tiles.join('|') !== b.tiles.join('|')) issues.push(`grid tiles: ${a.tiles.length} -> ${b.tiles.length} [${b.tiles.join(', ')}]`);

    // every image and internal link on the new page must load
    const pageUrl = BASE + urlPath;
    const refs = new Set();
    for (const m of newHtml.matchAll(/(?:src|href|data-full)=['"]([^'"#]+)['"]/g)) refs.add(m[1]);
    if (Array.isArray(b.slides)) b.slides.forEach((s) => refs.add(s.src));
    for (const r of refs) {
      if (/^(mailto:|javascript:)/.test(r)) continue;
      const u = new URL(r.replace(/&amp;/g, '&'), pageUrl).href;
      if (!u.startsWith(BASE) && !u.includes('ytimg.com')) continue; // external links: not checked here
      const s = await status(u);
      if (s !== 200) issues.push(`broken ${s}: ${u.replace(BASE, '')}`);
    }
    issues.length ? bad++ : ok++;
    out.push(`${issues.length ? 'FAIL' : 'ok  '} ${urlPath}${issues.length ? '\n     - ' + issues.join('\n     - ') : ''}`);
  }
  // new pages not in the archive
  for (const p of ['/animations/']) {
    const s = await status(BASE + p);
    out.push(`${s === 200 ? 'ok  ' : 'FAIL'} ${p} (new) HTTP ${s}`);
  }
  const summary = `\n${ok} pages match, ${bad} with differences (base ${BASE})`;
  fs.writeFileSync(path.join(__dirname, 'compare-report.txt'), out.join('\n') + summary + '\n');
  console.log(out.filter((l) => l.startsWith('FAIL')).join('\n') + summary);
})();
