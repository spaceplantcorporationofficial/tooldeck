// Notify Bing/Yandex/etc. of all sitemap URLs via IndexNow (https://www.indexnow.org).
import fs from 'node:fs';
const cfg = JSON.parse(fs.readFileSync('site.config.json', 'utf8'));
const site = cfg.siteUrl.replace(/\/$/, '');
const urlList = [...fs.readFileSync('dist/sitemap.xml', 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST', headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: new URL(site).host, key: cfg.indexNowKey, keyLocation: `${site}/${cfg.indexNowKey}.txt`, urlList })
});
console.log(`IndexNow: HTTP ${res.status} for ${urlList.length} URLs`);
