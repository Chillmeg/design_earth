// Supplement the wget mirror with content wget can't see:
//  1. slideshow slides loaded via POST /ndxzsite/plugin/ajax.php (captions, video embeds)
//  2. images referenced only in JS (preload arrays) or in AJAX output
// Writes into _archive-original/_ajax/ (new files only; never touches the wget mirror files).
const fs = require('fs');
const path = require('path');

const ROOT = 'D:/repos/26_DE_website/_archive-original';
const SITE = path.join(ROOT, 'design-earth.org');
const OUT = path.join(ROOT, '_ajax');
const BASE = 'https://design-earth.org';

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchRetry(url, opts, tries = 3) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, opts);
      return r;
    } catch (e) {
      if (i === tries - 1) throw e;
      await sleep(1000);
    }
  }
}

(async () => {
  fs.mkdirSync(path.join(OUT, 'slides'), { recursive: true });
  const pages = walk(SITE);
  const index = {}; // page -> {ids, preload}
  const allIds = new Set();
  const imgUrls = new Set();

  for (const p of pages) {
    const html = fs.readFileSync(p, 'utf8');
    const rel = path.relative(SITE, p).replace(/\\/g, '/');
    const ids = (html.match(/var img = new Array\(([^)]*)\)/) || [])[1];
    const pre = (html.match(/\$\(\[([^\]]*)\]\)\.preload\(\)/) || [])[1];
    const entry = {};
    if (ids) { entry.ids = ids.split(',').map((s) => s.trim()).filter(Boolean); entry.ids.forEach((i) => allIds.add(i)); }
    if (pre) { entry.preload = pre.split(',').map((s) => s.trim().replace(/^'|'$/g, '')).filter(Boolean); entry.preload.forEach((f) => imgUrls.add(`${BASE}/files/gimgs/${f}`)); }
    if (ids || pre) index[rel] = entry;
  }

  const results = {};
  let n = 0;
  for (const id of allIds) {
    const f = path.join(OUT, 'slides', `${id}.json`);
    let body;
    if (fs.existsSync(f)) body = fs.readFileSync(f, 'utf8');
    else {
      const r = await fetchRetry(`${BASE}/ndxzsite/plugin/ajax.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `jxs=slideshow&i=${id}&z=999`,
      });
      body = await r.text();
      fs.writeFileSync(f, body);
      await sleep(150);
    }
    n++;
    try {
      const j = JSON.parse(body);
      results[id] = { mime: j.mime, height: j.height };
      for (const m of (j.output || '').matchAll(/(?:src|href)=["']([^"']+)["']/g)) {
        const u = m[1].replace(':443', '');
        if (u.startsWith(BASE + '/files/')) imgUrls.add(u);
      }
    } catch { results[id] = { error: 'bad json', body: body.slice(0, 200) }; }
    if (n % 50 === 0) console.log(`slides ${n}/${allIds.size}`);
  }

  // Download images wget didn't get
  const missing = [];
  let got = 0;
  for (const u of imgUrls) {
    const rel = decodeURIComponent(new URL(u).pathname);
    const dest = path.join(SITE, rel);
    if (fs.existsSync(dest)) continue;
    const dest2 = path.join(OUT, 'files', rel.replace(/^\/files\//, '').replace(/[:*?"<>|]/g, '_'));
    if (fs.existsSync(dest2)) continue;
    const r = await fetchRetry(u);
    if (!r.ok) { missing.push(`${r.status} ${u}`); continue; }
    fs.mkdirSync(path.dirname(dest2), { recursive: true });
    fs.writeFileSync(dest2, Buffer.from(await r.arrayBuffer()));
    got++;
    await sleep(100);
  }

  fs.writeFileSync(path.join(OUT, 'pages-index.json'), JSON.stringify(index, null, 1));
  fs.writeFileSync(path.join(OUT, 'slides-summary.json'), JSON.stringify(results, null, 1));
  fs.writeFileSync(path.join(OUT, 'missing.txt'), missing.join('\n'));
  const mimes = {};
  Object.values(results).forEach((r) => (mimes[r.mime] = (mimes[r.mime] || 0) + 1));
  console.log(JSON.stringify({ pagesWithSlideshow: Object.keys(index).length, slideIds: allIds.size, mimes, extraImagesDownloaded: got, missing: missing.length }));
})();
