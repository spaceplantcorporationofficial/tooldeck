(() => {
  const { $, copy, download } = TD;
  const inp = $('#cjin'), out = $('#cjout'), msg = $('#cjmsg');
  let lastExt = 'json';
  const say = (t, ok) => { msg.textContent = t; msg.className = 'msg ' + (ok ? 'ok' : 'bad'); };

  function detect(text) {
    const line = text.split(/\r?\n/)[0] || '';
    const counts = [',', ';', '\t'].map((d) => [d, line.split(d).length]);
    return counts.sort((a, b) => b[1] - a[1])[0][0];
  }
  // RFC 4180 parser: quoted fields may contain delimiters, newlines and "" escapes.
  function parseCSV(text, d) {
    const rows = []; let row = [], f = '', q = false;
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (q) {
        if (c === '"') { if (text[i + 1] === '"') { f += '"'; i++; } else q = false; }
        else f += c;
      } else if (c === '"' && f === '') q = true;
      else if (c === d) { row.push(f); f = ''; }
      else if (c === '\n' || c === '\r') {
        if (c === '\r' && text[i + 1] === '\n') i++;
        row.push(f); rows.push(row); row = []; f = '';
      } else f += c;
    }
    if (q) throw new Error('Unclosed quote in CSV.');
    if (f !== '' || row.length) { row.push(f); rows.push(row); }
    return rows.filter((r) => !(r.length === 1 && r[0] === ''));
  }
  const typed = (v) => {
    if (!$('#cjtypes').checked) return v;
    if (/^-?(0|[1-9]\d*)(\.\d+)?([eE][+-]?\d+)?$/.test(v)) return Number(v);
    if (v === 'true') return true;
    if (v === 'false') return false;
    if (v === '') return null;
    return v;
  };
  function csvToJson(text, d) {
    const rows = parseCSV(text, d);
    if (rows.length < 1) throw new Error('No rows found.');
    const head = rows[0].map((h, i) => h.trim() || 'column' + (i + 1));
    return rows.slice(1).map((r) => Object.fromEntries(head.map((h, i) => [h, typed(r[i] ?? '')])));
  }
  function jsonToCsv(data, d) {
    if (!Array.isArray(data)) data = [data];
    const keys = [...new Set(data.flatMap((o) => (o && typeof o === 'object' && !Array.isArray(o) ? Object.keys(o) : ['value'])))];
    const cell = (v) => {
      if (v === null || v === undefined) return '';
      const s = typeof v === 'object' ? JSON.stringify(v) : String(v);
      return s.includes(d) || /["\r\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
    };
    const rows = data.map((o) => keys.map((k) => cell(o && typeof o === 'object' && !Array.isArray(o) ? o[k] : o)).join(d));
    return [keys.map(cell).join(d), ...rows].join('\n');
  }
  const delim = (text) => ($('#cjdelim').value === 'auto' ? detect(text) : $('#cjdelim').value);

  $('#tojson').onclick = () => {
    try { const j = csvToJson(inp.value, delim(inp.value)); out.value = JSON.stringify(j, null, 2); lastExt = 'json'; say(`✓ Converted ${j.length} rows to JSON.`, true); }
    catch (e) { say('✗ ' + e.message, false); }
  };
  $('#tocsv').onclick = () => {
    try { const data = JSON.parse(inp.value); const d = $('#cjdelim').value === 'auto' ? ',' : $('#cjdelim').value; out.value = jsonToCsv(data, d); lastExt = 'csv'; say(`✓ Converted ${Array.isArray(data) ? data.length : 1} records to CSV.`, true); }
    catch (e) { say('✗ ' + (e instanceof SyntaxError ? 'Input is not valid JSON: ' + e.message : e.message), false); }
  };
  $('#cjcopy').onclick = (e) => copy(out.value, e.target);
  $('#cjdl').onclick = () => out.value && download('converted.' + lastExt, out.value, lastExt === 'csv' ? 'text/csv' : 'application/json');
  window.__cj = { parseCSV, csvToJson, jsonToCsv, detect };
})();
