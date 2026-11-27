(() => {
  const { $ } = TD;
  const MAX = 1000;
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // Returns { re, matches } or { error }. Always iterates safely (zero-length matches advance).
  function run(pattern, flags, text) {
    let re;
    try { re = new RegExp(pattern, flags); } catch (e) { return { error: e.message }; }
    const matches = [];
    if (re.global || re.sticky) {
      re.lastIndex = 0;
      let m;
      while ((m = re.exec(text)) && matches.length < MAX) {
        matches.push(m);
        if (m[0] === '') re.lastIndex += (re.unicode || re.unicodeSets) && text.codePointAt(m.index) > 0xffff ? 2 : 1;
      }
    } else {
      const m = re.exec(text);
      if (m) matches.push(m);
    }
    return { re, matches };
  }

  function render() {
    const p = $('#rxp').value, f = $('#rxf').value.replace(/[^dgimsuvy]/g, ''), t = $('#rxt').value, msg = $('#rxmsg');
    const r = run(p, [...new Set(f)].join(''), t);
    if (r.error) {
      msg.textContent = '✗ ' + r.error; msg.className = 'msg bad';
      $('#rxhl').textContent = t; $('#rxtbl').innerHTML = ''; $('#rxout').textContent = '';
      return;
    }
    const ms = r.matches;
    msg.textContent = ms.length ? `✓ ${ms.length}${ms.length === MAX ? '+' : ''} match${ms.length === 1 ? '' : 'es'}` : 'No matches';
    msg.className = 'msg ' + (ms.length ? 'ok' : '');
    let html = '', pos = 0;
    for (const m of ms) {
      if (m.index < pos) continue;
      html += esc(t.slice(pos, m.index)) + `<mark style="background:#7c5cff66;color:inherit;border-radius:3px">${esc(m[0]) || '<span style="border-left:2px solid var(--accent2)"></span>'}</mark>`;
      pos = m.index + m[0].length;
    }
    $('#rxhl').innerHTML = html + esc(t.slice(pos));
    $('#rxtbl').innerHTML = ms.slice(0, 200).map((m, i) => {
      const named = m.groups ? Object.entries(m.groups).map(([k, v]) => `${esc(k)}: ${v === undefined ? '∅' : esc(v)}`) : [];
      const numbered = m.slice(1).map((g, j) => `$${j + 1}: ${g === undefined ? '∅' : esc(g)}`);
      return `<tr><td>${i + 1}</td><td style="text-align:left;font-family:ui-monospace,Menlo,monospace">${esc(m[0])}</td><td>${m.index}</td><td style="text-align:left">${(named.length ? named : numbered).join('<br>') || '–'}</td></tr>`;
    }).join('');
    $('#rxout').textContent = t.replace(r.re, $('#rxr').value);
  }

  ['rxp', 'rxf', 'rxt', 'rxr'].forEach((i) => $('#' + i).addEventListener('input', render));
  render();
  window.__rx = run;
})();
