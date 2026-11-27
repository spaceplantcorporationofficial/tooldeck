(() => {
  const { $, copy, fmtBytes } = TD;
  const inp = $('#b64in'), out = $('#b64out'), msg = $('#bmsg'), safe = $('#urlsafe');
  const say = (t, ok) => { msg.textContent = t; msg.className = 'msg ' + (ok ? 'ok' : 'bad'); };

  function bytesToB64(bytes) {
    let bin = '';
    for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
    return btoa(bin);
  }
  function encode(text) {
    let s = bytesToB64(new TextEncoder().encode(text));
    if (safe.checked) s = s.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    return s;
  }
  function decode(s) {
    s = s.trim().replace(/^data:[^,]*,/, '').replace(/\s+/g, '').replace(/-/g, '+').replace(/_/g, '/');
    if (/[^A-Za-z0-9+/=]/.test(s)) throw new Error('Input contains characters that are not valid Base64.');
    while (s.length % 4) s += '=';
    const bin = atob(s);
    const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
    return new TextDecoder('utf-8', { fatal: true }).decode(bytes);
  }

  $('#enc').onclick = () => { out.value = encode(inp.value); say(`✓ Encoded ${fmtBytes(new TextEncoder().encode(inp.value).length)} → ${out.value.length} characters.`, true); };
  $('#dec').onclick = () => {
    try { out.value = decode(inp.value); say('✓ Decoded successfully.', true); }
    catch (e) { out.value = ''; say('✗ ' + (e.name === 'TypeError' ? 'Decoded bytes are not valid UTF-8 text (it may be a binary file).' : e.message), false); }
  };
  $('#swap').onclick = () => { inp.value = out.value; out.value = ''; msg.textContent = ''; };
  $('#bcopy').onclick = (e) => copy(out.value, e.target);
  $('#bfile').onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const r = new FileReader();
    r.onload = () => { out.value = r.result; say(`✓ ${file.name} (${fmtBytes(file.size)}) → data URI, ${out.value.length.toLocaleString()} characters.`, true); };
    r.readAsDataURL(file);
  };
})();
