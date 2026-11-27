(() => {
  const { $, copy, download } = TD;
  const FREE_MAX = 10;
  const hex = (b) => [...b].map((x) => x.toString(16).padStart(2, '0')).join('');
  const fmt = (h) => `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;

  function v4() {
    const b = crypto.getRandomValues(new Uint8Array(16));
    b[6] = (b[6] & 0x0f) | 0x40; b[8] = (b[8] & 0x3f) | 0x80;
    return fmt(hex(b));
  }
  let lastMs = 0, seq = 0;
  function v7(now = Date.now()) {
    const b = crypto.getRandomValues(new Uint8Array(16));
    // Keep IDs generated in the same millisecond monotonic by bumping a 12-bit counter in rand_a.
    if (now <= lastMs) { seq++; if (seq > 0xfff) { lastMs++; seq = 0; } now = lastMs; } else { lastMs = now; seq = b[7] & 0x7f; }
    for (let i = 5; i >= 0; i--) { b[i] = now % 256; now = Math.floor(now / 256); }
    b[6] = 0x70 | ((seq >> 8) & 0x0f); b[7] = seq & 0xff;
    b[8] = (b[8] & 0x3f) | 0x80;
    return fmt(hex(b));
  }
  function inspect(s) {
    const h = s.trim().toLowerCase().replace(/^urn:uuid:|[{}]/g, '');
    const m = /^([0-9a-f]{8})-?([0-9a-f]{4})-?([0-9a-f]{4})-?([0-9a-f]{4})-?([0-9a-f]{12})$/.exec(h);
    if (!m) return null;
    const flat = m.slice(1).join('');
    if (/^0+$/.test(flat)) return { version: 'nil' };
    const version = parseInt(flat[12], 16), vbits = parseInt(flat[16], 16);
    const variant = vbits >= 8 && vbits < 12 ? 'RFC 9562' : vbits < 8 ? 'NCS (legacy)' : vbits < 14 ? 'Microsoft (legacy)' : 'reserved';
    const r = { version, variant };
    if (version === 7) r.time = new Date(parseInt(flat.slice(0, 12), 16)).toISOString();
    return r;
  }

  function gen() {
    let n = Math.max(1, Math.min(1000, Math.round(+$('#ucount').value || 1)));
    if (n > FREE_MAX && !TD.requirePro(`Generating ${n} UUIDs at once`)) n = FREE_MAX;
    const f = $('#uver').value === '7' ? v7 : v4;
    let list = Array.from({ length: n }, () => f());
    if ($('#unohyph').checked) list = list.map((u) => u.replace(/-/g, ''));
    if ($('#uupper').checked) list = list.map((u) => u.toUpperCase());
    $('#uout').value = list.join('\n');
    $('#umsg').textContent = `Generated ${n} UUID v${$('#uver').value}${n === 1 ? '' : 's'}.`;
  }
  $('#ugen').onclick = gen;
  ['uver', 'uupper', 'unohyph'].forEach((i) => $('#' + i).addEventListener('input', gen));
  $('#ucopy').onclick = (e) => copy($('#uout').value, e.target);
  $('#udl').onclick = () => download('uuids.txt', $('#uout').value + '\n');
  $('#uchk').addEventListener('input', () => {
    const v = $('#uchk').value, r = $('#uchkres');
    if (!v.trim()) { r.textContent = ''; return; }
    const i = inspect(v);
    if (!i) { r.textContent = '✗ Not a valid UUID.'; r.className = 'msg bad'; return; }
    r.className = 'msg ok';
    r.textContent = i.version === 'nil' ? '✓ Valid nil UUID (all zeros).' : `✓ Valid UUID · version ${i.version} · ${i.variant} variant${i.time ? ' · created ' + i.time : ''}`;
  });
  gen();
  window.__uuid = { v4, v7, inspect };
})();
