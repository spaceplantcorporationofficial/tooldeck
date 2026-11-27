(() => {
  const { $, copy, fmtBytes } = TD;
  const input = $('#in'), msg = $('#msg'), stats = $('#jstats');

  const say = (t, ok) => { msg.textContent = t; msg.className = 'msg ' + (ok ? 'ok' : 'bad'); };
  const indent = () => ($('#indent').value === 'tab' ? '\t' : Number($('#indent').value));
  const sortKeys = (v) => Array.isArray(v) ? v.map(sortKeys)
    : v && typeof v === 'object' ? Object.keys(v).sort().reduce((o, k) => ((o[k] = sortKeys(v[k])), o), {}) : v;

  function locate(err, text) {
    // Different engines report positions differently: "position 12", "line 2 column 5".
    let m = /line (\d+) column (\d+)/i.exec(err.message);
    if (m) return { line: +m[1], col: +m[2] };
    m = /position (\d+)/i.exec(err.message);
    if (!m) return null;
    const before = text.slice(0, +m[1]).split('\n');
    return { line: before.length, col: before[before.length - 1].length + 1 };
  }

  function parse() {
    const text = input.value;
    if (!text.trim()) { say('Paste some JSON first.', false); return undefined; }
    try {
      const v = JSON.parse(text);
      return $('#sort').checked ? sortKeys(v) : v;
    } catch (e) {
      const loc = locate(e, text);
      say('✗ Invalid JSON' + (loc ? ` at line ${loc.line}, column ${loc.col}` : '') + ': ' + e.message, false);
      stats.innerHTML = '';
      return undefined;
    }
  }

  function count(v) {
    let keys = 0, depth = 0;
    (function walk(x, d) {
      depth = Math.max(depth, d);
      if (x && typeof x === 'object') for (const k in x) { if (!Array.isArray(x)) keys++; walk(x[k], d + 1); }
    })(v, 0);
    return { keys, depth };
  }

  function show(v, out) {
    input.value = out;
    const { keys, depth } = count(v);
    stats.innerHTML = `<div class="stat"><b>${fmtBytes(new Blob([out]).size)}</b><span>Size</span></div>
      <div class="stat"><b>${keys}</b><span>Keys</span></div><div class="stat"><b>${depth}</b><span>Max depth</span></div>`;
  }

  $('#fmtBtn').onclick = () => { const v = parse(); if (v !== undefined) { show(v, JSON.stringify(v, null, indent())); say('✓ Valid JSON, formatted.', true); } };
  $('#minBtn').onclick = () => { const v = parse(); if (v !== undefined) { show(v, JSON.stringify(v)); say('✓ Valid JSON, minified.', true); } };
  $('#valBtn').onclick = () => { const v = parse(); if (v !== undefined) say('✓ Valid JSON.', true); };
  $('#copyBtn').onclick = (e) => copy(input.value, e.target);
  $('#clearBtn').onclick = () => { input.value = ''; msg.textContent = ''; stats.innerHTML = ''; input.focus(); };
  input.addEventListener('keydown', (e) => { if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') $('#fmtBtn').click(); });
})();
