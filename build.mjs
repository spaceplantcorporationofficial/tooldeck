import fs from 'node:fs';
import path from 'node:path';
import tools from './tools.mjs';

const cfg = JSON.parse(fs.readFileSync('site.config.json', 'utf8'));
const SITE = (process.env.SITE_URL || cfg.siteUrl).replace(/\/$/, '');
const SUPPORT = process.env.STRIPE_SUPPORT_LINK || cfg.stripe.supportLink;
const OUT = 'dist';
const today = new Date().toISOString().slice(0, 10);

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const ld = (o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`;

function head({ title, description, url, root, jsonld }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${url}">
<meta name="robots" content="index,follow,max-image-preview:large">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(cfg.name)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${url}">
<meta name="twitter:card" content="summary">
<meta name="theme-color" content="#0b1020">
<link rel="icon" href="${root}favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="${root}assets/style.css">
${jsonld.map(ld).join('\n')}
</head>
<body>
<header class="site"><a class="brand" href="${root}">⚡ <span>${esc(cfg.name)}</span></a>
<nav><a href="${root}#tools">All tools</a><a href="${root}about/">About</a></nav></header>`;
}

function supportBox(slug) {
  if (!SUPPORT) return '';
  const href = SUPPORT + (SUPPORT.includes('?') ? '&' : '?') + 'client_reference_id=' + encodeURIComponent(slug);
  return `<aside class="card support"><p>☕ ${esc(cfg.name)} is free and ad-free. If this saved you time, chip in to keep new tools coming.</p>
<a class="btn" href="${esc(href)}" target="_blank" rel="noopener">${esc(cfg.stripe.supportLabel)}</a></aside>`;
}

function foot(root, scripts = []) {
  return `<footer class="site"><span>© ${new Date().getFullYear()} ${esc(cfg.name)} · ${esc(cfg.tagline)}</span>
<span><a href="${root}privacy/">Privacy</a> · <a href="${root}sitemap.xml">Sitemap</a></span></footer>
<script src="${root}assets/site.js"></script>
${scripts.map((s) => `<script src="${root}${s}"></script>`).join('\n')}
</body></html>
`;
}

function write(rel, html) {
  const f = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, html);
}

fs.rmSync(OUT, { recursive: true, force: true });
fs.cpSync('assets', path.join(OUT, 'assets'), { recursive: true });

const urls = [];

// Tool pages
for (const t of tools) {
  const url = `${SITE}/tools/${t.slug}/`;
  urls.push(url);
  const root = '../../';
  const related = tools.filter((x) => x.slug !== t.slug).slice(0, 4);
  const jsonld = [
    {
      '@context': 'https://schema.org', '@type': 'WebApplication', name: t.name, url,
      description: t.description, applicationCategory: t.appCategory, operatingSystem: 'Any (web browser)',
      browserRequirements: 'Requires JavaScript', isAccessibleForFree: true,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }
    },
    {
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: t.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } }))
    },
    {
      '@context': 'https://schema.org', '@type': 'HowTo', name: `How to use the ${t.name}`,
      step: t.howto.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, text: s }))
    },
    {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: cfg.name, item: SITE + '/' },
        { '@type': 'ListItem', position: 2, name: t.name, item: url }
      ]
    }
  ];
  write(`tools/${t.slug}/index.html`,
    head({ title: t.title, description: t.description, url, root, jsonld }) + `
<main>
<nav class="crumbs" aria-label="Breadcrumb"><a href="${root}">${esc(cfg.name)}</a> › ${esc(t.category)} › ${esc(t.name)}</nav>
<h1>${t.emoji} ${esc(t.h1)}</h1>
<p class="lead">${esc(t.lead)}</p>
${t.body}
${supportBox(t.slug)}
<section class="prose"><h2>How to use the ${esc(t.name)}</h2><ol>${t.howto.map((s) => `<li>${esc(s)}</li>`).join('')}</ol></section>
<section class="faq prose"><h2>Frequently asked questions</h2>
${t.faq.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('\n')}
</section>
<section><h2>More free tools</h2><div class="grid">
${related.map((r) => `<a class="card tool-link" href="${root}tools/${r.slug}/"><div class="emoji">${r.emoji}</div><h3>${esc(r.name)}</h3><p>${esc(r.lead)}</p></a>`).join('\n')}
</div></section>
</main>` + foot(root, [`assets/tools/${t.slug}.js`]));
}

// Home
const cats = [...new Set(tools.map((t) => t.category))];
write('index.html',
  head({
    title: `${cfg.name} – Free Online Tools That Run in Your Browser`,
    description: `${tools.length}+ free, fast and private online tools: image compressor, JSON formatter, compound interest calculator, word counter and more. No sign-up.`,
    url: SITE + '/', root: '',
    jsonld: [
      { '@context': 'https://schema.org', '@type': 'WebSite', name: cfg.name, url: SITE + '/', description: cfg.tagline },
      {
        '@context': 'https://schema.org', '@type': 'ItemList',
        itemListElement: tools.map((t, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE}/tools/${t.slug}/`, name: t.name }))
      }
    ]
  }) + `
<main>
<h1>Free online tools that just work.</h1>
<p class="lead">${esc(cfg.tagline)} Every tool runs locally in your browser: instant, private and free.</p>
<section id="tools">
${cats.map((c) => `<h2>${esc(c)}</h2><div class="grid">
${tools.filter((t) => t.category === c).map((t) => `<a class="card tool-link" href="tools/${t.slug}/"><div class="emoji">${t.emoji}</div><h3>${esc(t.name)}</h3><p>${esc(t.lead)}</p><span class="tag">${esc(t.category)}</span></a>`).join('\n')}
</div>`).join('\n')}
</section>
${supportBox('home')}
</main>` + foot(''));
urls.unshift(SITE + '/');

// Static pages
const pages = {
  about: ['About', `About ${cfg.name}`, `${cfg.name} builds free, privacy-first web tools that run entirely in your browser.`,
    `<p>${esc(cfg.name)} is a growing collection of free utilities for everyday tasks: compressing images, formatting code, planning finances, writing and staying secure online.</p>
<p>Every tool runs <strong>locally in your browser</strong>. We do not upload your files or text, there are no accounts, and pages load fast on any device.</p>
<p>The site is funded by optional support from people who find it useful.</p>`],
  privacy: ['Privacy Policy', `Privacy Policy – ${cfg.name}`, `${cfg.name} privacy policy: tools run locally, your files and text are never uploaded or stored.`,
    `<p>All tools on ${esc(cfg.name)} process data on your device. Files, text and generated values are never sent to our servers.</p>
<p>We do not use advertising trackers. Our host may keep standard server logs (such as IP address and pages requested) for security and reliability.</p>
<p>Optional payments are processed by Stripe under <a href="https://stripe.com/privacy" rel="noopener">Stripe's privacy policy</a>. We never see your full card details.</p>`]
};
for (const [slug, [h, title, desc, html]] of Object.entries(pages)) {
  const url = `${SITE}/${slug}/`;
  urls.push(url);
  write(`${slug}/index.html`, head({ title, description: desc, url, root: '../', jsonld: [] }) +
    `<main class="prose"><h1>${esc(h)}</h1>${html}</main>` + foot('../'));
}

write('404.html', head({ title: `Page not found – ${cfg.name}`, description: 'This page does not exist.', url: SITE + '/404.html', root: '/', jsonld: [] })
  .replace('index,follow', 'noindex') + `<main><h1>Page not found</h1><p class="lead">Try one of our <a href="/">free tools</a>.</p></main>` + foot('/'));

write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`);
write('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
write('favicon.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="#7c5cff"/><stop offset="1" stop-color="#22d3ee"/></linearGradient></defs><rect width="64" height="64" rx="14" fill="#0b1020"/><path d="M36 6 14 36h14l-4 22 22-30H32z" fill="url(#g)"/></svg>`);
write('.nojekyll', '');

console.log(`Built ${tools.length} tools, ${urls.length} URLs → ${OUT}/ (site: ${SITE}, stripe: ${SUPPORT ? 'linked' : 'NOT linked'})`);
