(() => {
  const { $ } = TD;
  const CATS = [['Underweight', 0, 18.5], ['Healthy weight', 18.5, 25], ['Overweight', 25, 30], ['Obesity class I', 30, 35], ['Obesity class II', 35, 40], ['Obesity class III', 40, Infinity]];
  const COLORS = ['#fbbf24', 'var(--ok)', '#fbbf24', 'var(--bad)', 'var(--bad)', 'var(--bad)'];
  const bmiOf = (kg, m) => kg / (m * m);
  const category = (b) => CATS.findIndex(([, lo, hi]) => b >= lo && b < hi);
  const ids = ['bunits', 'bft', 'bin', 'blb', 'bcm', 'bkg'];

  function calc() {
    const imp = $('#bunits').value === 'imp';
    $('#bimp').hidden = !imp; $('#bmet').hidden = imp;
    const m = imp ? ((+$('#bft').value || 0) * 12 + (+$('#bin').value || 0)) * 0.0254 : (+$('#bcm').value || 0) / 100;
    const kg = imp ? (+$('#blb').value || 0) * 0.45359237 : +$('#bkg').value || 0;
    const w = (x) => (imp ? Math.round(x / 0.45359237) + ' lb' : x.toFixed(1) + ' kg');
    if (m <= 0 || kg <= 0) { $('#bmi').textContent = '–'; $('#bcat').textContent = 'Enter height & weight'; return; }
    const b = bmiOf(kg, m), c = category(b);
    $('#bmi').textContent = b.toFixed(1);
    $('#bcat').textContent = CATS[c][0];
    $('#bcat').style.color = COLORS[c];
    $('#brange').textContent = `${w(18.5 * m * m)} – ${w(24.9 * m * m)}`;
    $('#btbl').innerHTML = CATS.map(([n, lo, hi], i) => `<tr${i === c ? ' style="background:#ffffff10;font-weight:700"' : ''}><td>${n}</td><td>${hi === Infinity ? '≥ ' + lo : lo === 0 ? '< ' + hi : lo + ' – ' + (hi - 0.1).toFixed(1)}</td><td>${hi === Infinity ? '≥ ' + w(lo * m * m) : lo === 0 ? '< ' + w(hi * m * m) : w(lo * m * m) + ' – ' + w((hi - 0.1) * m * m)}</td></tr>`).join('');
  }
  ids.forEach((i) => $('#' + i).addEventListener('input', calc));
  calc();
  window.__bmi = { bmiOf, category, CATS };
})();
