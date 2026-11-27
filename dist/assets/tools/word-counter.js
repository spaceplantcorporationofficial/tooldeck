(() => {
  const { $, copy } = TD;
  const txt = $('#txt');
  const STOP = new Set('a an and are as at be but by for from has have he her his i if in into is it its me my not of on or our she so that the their them then there these they this to was we were what when which who will with you your can do does did just than too very also been had more most no only other some such up out about over all would could should how why where'.split(' '));
  const mins = (w, wpm) => { const s = Math.round((w / wpm) * 60); return s < 60 ? s + ' sec' : Math.floor(s / 60) + ' min ' + (s % 60 ? (s % 60) + ' s' : ''); };

  function update() {
    const t = txt.value;
    const words = t.match(/[\p{L}\p{N}][\p{L}\p{N}'’-]*/gu) || [];
    const w = words.length;
    $('#w').textContent = w.toLocaleString();
    $('#ch').textContent = [...t].length.toLocaleString();
    $('#chns').textContent = [...t.replace(/\s/g, '')].length.toLocaleString();
    $('#s').textContent = (t.match(/[^.!?…]+[.!?…]+(\s|$)|[^.!?…]+$/g) || []).filter((s) => /[\p{L}\p{N}]/u.test(s)).length.toLocaleString();
    $('#pa').textContent = t.split(/\n\s*\n/).filter((p) => p.trim()).length.toLocaleString();
    $('#rt').textContent = w ? mins(w, 238) : '0 min';
    $('#st').textContent = w ? mins(w, 130) : '0 min';

    const freq = new Map();
    for (const raw of words) {
      const k = raw.toLowerCase().replace(/[’']s$/, '');
      if (k.length < 3 || STOP.has(k) || /^\d+$/.test(k)) continue;
      freq.set(k, (freq.get(k) || 0) + 1);
    }
    const top = [...freq].sort((a, b) => b[1] - a[1]).slice(0, 10);
    $('#kw').innerHTML = top.length
      ? top.map(([k, c]) => `<tr><td>${k.replace(/</g, '&lt;')}</td><td>${c}</td><td>${((c / w) * 100).toFixed(1)}%</td></tr>`).join('')
      : '<tr><td colspan="3" style="text-align:left;color:var(--muted)">Type some text to see keyword density.</td></tr>';
    try { localStorage.setItem('td-wc', t); } catch {}
  }

  try { txt.value = localStorage.getItem('td-wc') || ''; } catch {}
  txt.addEventListener('input', update);
  $('#copyT').onclick = (e) => copy(txt.value, e.target);
  $('#clearT').onclick = () => { txt.value = ''; update(); txt.focus(); };
  update();
})();
