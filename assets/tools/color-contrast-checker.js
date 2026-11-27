(() => {
  const { $ } = TD;
  const fg = $('#fg'), bg = $('#bg'), fgc = $('#fgc'), bgc = $('#bgc');

  function parse(hex) {
    let h = hex.trim().replace(/^#/, '');
    if (/^[0-9a-f]{3}$/i.test(h)) h = h.split('').map((c) => c + c).join('');
    if (!/^[0-9a-f]{6}$/i.test(h)) return null;
    return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
  }
  const toHex = (rgb) => '#' + rgb.map((x) => Math.round(x).toString(16).padStart(2, '0')).join('');
  const lum = (rgb) => {
    const [r, g, b] = rgb.map((c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const ratio = (a, b) => { const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x); return (l1 + 0.05) / (l2 + 0.05); };

  // Darken or lighten the text color toward black/white until it reaches the target ratio.
  function suggest(f, b, target) {
    const toward = lum(b) > 0.18 ? [0, 0, 0] : [255, 255, 255];
    for (let t = 0; t <= 1.0001; t += 0.01) {
      const c = f.map((x, i) => x + (toward[i] - x) * t);
      if (ratio(c.map(Math.round), b) >= target) return toHex(c);
    }
    return toHex(toward);
  }

  const mark = (el, ok) => { el.textContent = ok ? '✓ Pass' : '✗ Fail'; el.style.color = ok ? 'var(--ok)' : 'var(--bad)'; };

  function update() {
    const f = parse(fg.value), b = parse(bg.value);
    if (!f || !b) { $('#ratio').textContent = '–'; $('#suggest').textContent = 'Enter colors as hex, e.g. #333 or #1a2b3c.'; $('#suggest').className = 'msg bad'; return; }
    fgc.value = toHex(f); bgc.value = toHex(b);
    const p = $('#preview'); p.style.color = toHex(f); p.style.background = toHex(b);
    const r = ratio(f, b);
    $('#ratio').textContent = (Math.floor(r * 100) / 100).toFixed(2) + ':1';
    mark($('#aan'), r >= 4.5); mark($('#aal'), r >= 3); mark($('#aaan'), r >= 7); mark($('#aaal'), r >= 4.5);
    const s = $('#suggest');
    if (r >= 4.5) { s.textContent = r >= 7 ? '✓ Excellent: passes every WCAG text check.' : '✓ Passes AA for all text sizes.'; s.className = 'msg ok'; }
    else { const fix = suggest(f, b, 4.5); s.innerHTML = `Try text color <b>${fix}</b> (${ratio(parse(fix), b).toFixed(2)}:1) to pass AA. <button class="secondary" id="apply" type="button">Apply</button>`; s.className = 'msg bad'; $('#apply').onclick = () => { fg.value = fix; update(); }; }
    history.replaceState(null, '', '#fg=' + toHex(f).slice(1) + '&bg=' + toHex(b).slice(1));
  }

  const h = new URLSearchParams(location.hash.slice(1));
  if (h.get('fg')) fg.value = '#' + h.get('fg');
  if (h.get('bg')) bg.value = '#' + h.get('bg');
  fg.addEventListener('input', update); bg.addEventListener('input', update);
  fgc.addEventListener('input', () => { fg.value = fgc.value; update(); });
  bgc.addEventListener('input', () => { bg.value = bgc.value; update(); });
  $('#cswap').onclick = () => { [fg.value, bg.value] = [bg.value, fg.value]; update(); };
  update();
})();
