// SEO + integrity checks over dist/. Exit code 1 on any failure.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const OUT = 'dist';
const errors = [], warns = [];
const files = [];
(function walk(d) { for (const f of fs.readdirSync(d)) { const p = path.join(d, f); fs.statSync(p).isDirectory() ? walk(p) : files.push(p); } })(OUT);

const titles = new Map(), descs = new Map();
for (const f of files.filter((f) => f.endsWith('.html'))) {
  const html = fs.readFileSync(f, 'utf8');
  const rel = path.relative(OUT, f);
  const get = (re) => (re.exec(html) || [])[1];
  const title = get(/<title>([^<]*)<\/title>/), desc = get(/<meta name="description" content="([^"]*)"/);
  if (!title) errors.push(`${rel}: missing <title>`);
  else {
    if (title.length > 65) warns.push(`${rel}: title ${title.length} chars (>65)`);
    if (titles.has(title)) errors.push(`${rel}: duplicate title with ${titles.get(title)}`); titles.set(title, rel);
  }
  if (!desc) errors.push(`${rel}: missing meta description`);
  else {
    if (!html.includes('content="noindex"') && (desc.length < 70 || desc.length > 165)) warns.push(`${rel}: description ${desc.length} chars`);
    if (descs.has(desc)) errors.push(`${rel}: duplicate description`); descs.set(desc, rel);
  }
  if (!/<link rel="canonical" href="https?:\/\/[^"]+">/.test(html)) errors.push(`${rel}: missing canonical`);
  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  if (h1s !== 1) errors.push(`${rel}: ${h1s} <h1> tags`);
  if (!/<html lang="/.test(html)) errors.push(`${rel}: missing lang`);
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1]); } catch (e) { errors.push(`${rel}: invalid JSON-LD (${e.message})`); }
  }
  // Every local href/src must resolve to a file in dist.
  for (const m of html.matchAll(/(?:href|src)="([^"#]*)(#[^"]*)?"/g)) {
    const u = m[1];
    if (!u || /^(https?:|mailto:|data:|blob:|\$\{)/.test(u)) continue;
    let target = u.startsWith('/') ? path.join(OUT, u) : path.join(path.dirname(f), u);
    if (u.endsWith('/') || fs.existsSync(target) && fs.statSync(target).isDirectory()) target = path.join(target, 'index.html');
    if (!fs.existsSync(target)) errors.push(`${rel}: broken link ${u}`);
  }
}

// Sitemap ↔ files
const site = fs.readFileSync(path.join(OUT, 'sitemap.xml'), 'utf8');
const locs = [...site.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const base = locs[0].replace(/\/$/, '');
for (const l of locs) {
  const p = path.join(OUT, l.slice(base.length), 'index.html');
  if (!fs.existsSync(p)) errors.push(`sitemap: ${l} has no page`);
}
if (!fs.readFileSync(path.join(OUT, 'robots.txt'), 'utf8').includes('Sitemap:')) errors.push('robots.txt missing Sitemap');

// JS syntax
for (const f of files.filter((f) => f.endsWith('.js'))) {
  try { execFileSync(process.execPath, ['--check', f], { stdio: 'pipe' }); } catch (e) { errors.push(`${f}: ${e.stderr}`); }
}

warns.forEach((w) => console.log('WARN ', w));
errors.forEach((e) => console.log('ERROR', e));
console.log(`\nChecked ${files.length} files, ${locs.length} sitemap URLs: ${errors.length} errors, ${warns.length} warnings`);
process.exit(errors.length ? 1 : 0);
