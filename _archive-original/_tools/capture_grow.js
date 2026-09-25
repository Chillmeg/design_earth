// Second pass: publication "grow" images (POST jxs=grow) and /files/download/ PDFs.
// Writes only into _archive-original/_ajax/.
const fs = require('fs');
const path = require('path');

const ROOT = 'D:/repos/26_DE_website/_archive-original';
const SITE = path.join(ROOT, 'design-earth.org');
const OUT = path.join(ROOT, '_ajax');
const BASE = 'https://design-earth.org';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const safe = (s) => s.replace(/[:*?"<>|]/g, '_');

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}

(async () => {
  fs.mkdirSync(path.join(OUT, 'grow'), { recursive: true });
  const nodes = new Set();
  const files = new Set();
  const growIndex = {};
  for (const p of walk(SITE)) {
    const html = fs.readFileSync(p, 'utf8');
    const rel = path.relative(SITE, p).replace(/\\/g, '/');
    const ids = [...html.matchAll(/id='a(\d+)'\s+onclick="\$\.fn\.ndxz_grow/g)].map((m) => m[1]);
    if (ids.length) { growIndex[rel] = ids; ids.forEach((i) => nodes.add(i)); }
    for (const m of html.matchAll(/href=["']https?:\/\/design-earth\.org(?::443)?(\/files\/[^"']+)["']/g)) files.add(m[1]);
  }

  const report = { growNodes: nodes.size, growOk: 0, downloads: [], missing: [], renamed: [] };
  const imgs = new Set();
  for (const id of nodes) {
    const f = path.join(OUT, 'grow', `${id}.html`);
    let body = fs.existsSync(f) ? fs.readFileSync(f, 'utf8') : null;
    if (!body) {
      const r = await fetch(`${BASE}/ndxzsite/plugin/ajax.php`, {
        method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `jxs=grow&i=${id}&s=true`,
      });
      body = await r.text();
      fs.writeFileSync(f, body);
      await sleep(150);
    }
    try {
      if (!body.includes("picture_holder")) throw 0;
      report.growOk++;
      for (const m of body.matchAll(/src=\\?["']([^"'\\]+)\\?["']/g)) {
        const u = m[1].replace(/\\\//g, '/').replace(':443', '');
        if (u.includes('/files/')) imgs.add(u.slice(u.indexOf('/files/')));
      }
    } catch { report.missing.push(`grow ${id}: bad json ${body.slice(0, 80)}`); }
  }

  for (const rel of [...imgs, ...files]) {
    const dec = decodeURIComponent(rel);
    if (fs.existsSync(path.join(SITE, dec))) continue;
    const dest = path.join(OUT, 'files', safe(dec.replace(/^\/files\//, '')));
    if (fs.existsSync(dest)) continue;
    const url = BASE + encodeURI(dec);
    const r = await fetch(url).catch((e) => ({ ok: false, status: e.message }));
    if (!r.ok) { report.missing.push(`${r.status} ${dec}`); continue; }
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, Buffer.from(await r.arrayBuffer()));
    report.downloads.push(dec);
    if (safe(dec) !== dec) report.renamed.push(dec);
    await sleep(150);
  }
  fs.writeFileSync(path.join(OUT, 'grow-index.json'), JSON.stringify(growIndex, null, 1));
  fs.writeFileSync(path.join(OUT, 'grow-report.json'), JSON.stringify(report, null, 1));
  console.log(JSON.stringify({ growNodes: report.growNodes, growOk: report.growOk, downloaded: report.downloads.length, missing: report.missing, renamed: report.renamed }, null, 1));
})();
