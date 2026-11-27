// Notify Bing/Yandex/etc. of all sitemap URLs via IndexNow (https://www.indexnow.org).
import fs from 'node:fs';
const cfg = JSON.parse(fs.readFileSync('site.config.json', 'utf8'));
const site = cfg.siteUrl.replace(/\/$/, '');
const urlList = [...fs.readFileSync('dist/sitemap.xml', 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
async function send() { return fetch('https://api.indexnow.org/indexnow', {
  method: 'POST', headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: new URL(site).host, key: cfg.indexNowKey, keyLocation: `${site}/${cfg.indexNowKey}.txt`, urlList })
}); }
let res;
for (let i = 0; i < 3; i++) { try { res = await send(); if (res.ok) break; } catch (e) { console.log('IndexNow retry:', e.cause?.code || e.message); } await new Promise((r) => setTimeout(r, 5000)); }
if (!res) process.exit(1);
console.log(`IndexNow: HTTP ${res.status} for ${urlList.length} URLs`);
