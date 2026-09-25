// Prints a markdown table of every archived page: URL, title, format, image count.
const fs = require('fs');
const path = require('path');
process.chdir(path.join(__dirname, '..'));
const S = 'design-earth.org';
const idx = JSON.parse(fs.readFileSync('_ajax/pages-index.json'));
const grow = JSON.parse(fs.readFileSync('_ajax/grow-index.json'));

function walk(d, o = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p, o);
    else if (e.name === 'index.html') o.push(p);
  }
  return o;
}

const rows = [];
for (const p of walk(S)) {
  const rel = path.relative(S, p).replace(/\\/g, '/');
  const h = fs.readFileSync(p, 'utf8');
  const title = (h.match(/<title>(.*?) : DESIGN EARTH<\/title>/) || [])[1] || '';
  const fmt = (h.match(/format-(\w+)/) || [])[1] || '';
  let n;
  if (idx[rel] && idx[rel].ids) n = idx[rel].ids.length;
  else if (fmt === 'slideshow') n = 1;
  else if (grow[rel]) n = grow[rel].length;
  else n = (h.match(/class='picture_holder'/g) || []).length + ' tiles';
  rows.push([rel.replace(/index\.html$/, ''), title, fmt, n]);
}
rows.sort((a, b) => a[0].localeCompare(b[0]));
console.log('| URL | Title | Format | Images |\n|---|---|---|---|');
for (const r of rows) console.log(`| /${r[0]} | ${r[1].replace(/\|/g, '\\|')} | ${r[2]} | ${r[3]} |`);
