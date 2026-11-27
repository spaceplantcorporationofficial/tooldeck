(() => {
  const { $ } = TD;
  const money = (x) => '$' + x.toFixed(2);

  // Pure calculation, exported for tests.
  function split({ bill, tax, people, pct, pretax, round }) {
    people = Math.max(1, Math.floor(people || 1));
    const base = pretax ? Math.max(0, bill - tax) : bill;
    let tip = (base * pct) / 100;
    let each = (bill + tip) / people;
    if (round) { each = Math.ceil(each - 1e-9); tip = each * people - bill; }
    else each = Math.ceil(each * 100 - 1e-6) / 100; // round up to the cent so the bill is always covered
    return { tip, total: bill + tip, each, tipEach: tip / people, realPct: base > 0 ? (tip / base) * 100 : 0 };
  }

  function calc() {
    $('#tpctv').textContent = $('#tpct').value;
    const r = split({ bill: +$('#tbill').value || 0, tax: +$('#ttax').value || 0, people: +$('#tpeople').value, pct: +$('#tpct').value, pretax: $('#tpretax').checked, round: $('#tround').checked });
    $('#ttip').textContent = money(r.tip);
    $('#ttotal').textContent = money(r.total);
    $('#teach').textContent = money(r.each);
    $('#ttipeach').textContent = money(r.tipEach);
    $('#tnote').textContent = $('#tround').checked ? `Effective tip after rounding: ${r.realPct.toFixed(1)}%` : '';
  }
  ['tbill', 'ttax', 'tpeople', 'tpct', 'tpretax', 'tround'].forEach((i) => $('#' + i).addEventListener('input', calc));
  $('#tquick').addEventListener('click', (e) => { if (e.target.dataset.p) { $('#tpct').value = e.target.dataset.p; calc(); } });
  calc();
  window.__tip = split;
})();
