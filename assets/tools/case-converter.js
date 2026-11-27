(() => {
  const { $, copy } = TD;
  const ta = $('#ct');
  const SMALL = new Set('a an and as at but by for if in nor of on or per so the to up via vs yet'.split(' '));
  // Split into words, handling existing camelCase, snake_case, kebab-case and punctuation.
  const words = (s) => s.replace(/([a-z0-9])([A-Z])/g, '$1 $2').replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .split(/[^\p{L}\p{N}]+/u).filter(Boolean);
  const cap = (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();

  const conv = {
    upper: (s) => s.toUpperCase(),
    lower: (s) => s.toLowerCase(),
    title: (s) => s.toLowerCase().replace(/[\p{L}\p{N}'’]+/gu, (w, i) => {
      const prev = s.slice(0, i).trimEnd();
      const starts = i === 0 || /[.!?:\n]$/.test(prev);
      return !starts && SMALL.has(w) ? w : cap(w);
    }),
    sentence: (s) => s.toLowerCase().replace(/(^\s*|[.!?]\s+|\n\s*)(\p{L})/gu, (m, a, b) => a + b.toUpperCase()).replace(/\bi\b/g, 'I'),
    camel: (s) => words(s).map((w, i) => (i ? cap(w) : w.toLowerCase())).join(''),
    pascal: (s) => words(s).map(cap).join(''),
    snake: (s) => words(s).map((w) => w.toLowerCase()).join('_'),
    kebab: (s) => words(s).map((w) => w.toLowerCase()).join('-'),
    constant: (s) => words(s).map((w) => w.toUpperCase()).join('_'),
    alt: (s) => { let k = 0; return [...s].map((ch) => (/\p{L}/u.test(ch) ? (k++ % 2 ? ch.toUpperCase() : ch.toLowerCase()) : ch)).join(''); }
  };

  $('#cases').addEventListener('click', (e) => {
    const c = e.target.dataset && e.target.dataset.c;
    if (!c) return;
    ta.value = conv[c](ta.value);
    document.querySelectorAll('#cases button').forEach((b) => b.classList.toggle('secondary', b !== e.target));
  });
  $('#ccopy').onclick = (e) => copy(ta.value, e.target);
  $('#cclear').onclick = () => { ta.value = ''; ta.focus(); };
})();
