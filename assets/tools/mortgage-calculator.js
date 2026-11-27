(() => {
  const { $ } = TD;
  const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
  const ids = ['price', 'down', 'rate', 'term', 'tax', 'ins', 'hoa', 'pmi'];
  const v = (id) => Math.max(0, +$('#' + id).value || 0);

  function calc() {
    const price = v('price'), downPct = Math.min(100, v('down')), years = v('term');
    const loan = price * (1 - downPct / 100), n = years * 12, r = v('rate') / 100 / 12;
    const pi = loan === 0 ? 0 : r === 0 ? loan / n : (loan * r) / (1 - Math.pow(1 + r, -n));
    const pmi = downPct < 20 ? (loan * v('pmi')) / 100 / 12 : 0;
    const extra = (price * v('tax')) / 100 / 12 + v('ins') / 12 + v('hoa') + pmi;
    let bal = loan, rows = '', totalInt = 0;
    for (let y = 1; y <= years; y++) {
      let pp = 0, ip = 0;
      for (let m = 0; m < 12 && bal > 0.005; m++) {
        const i = bal * r, p = Math.min(bal, pi - i);
        ip += i; pp += p; bal -= p;
      }
      totalInt += ip;
      rows += `<tr><td>${y}</td><td>${money.format(pp)}</td><td>${money.format(ip)}</td><td>${money.format(Math.max(0, bal))}</td></tr>`;
    }
    $('#mtotal').textContent = money.format(pi + extra);
    $('#mpi').textContent = money.format(pi);
    $('#mextra').textContent = money.format(extra) + (pmi ? ' incl. PMI' : '');
    $('#mloan').textContent = money.format(loan);
    $('#mint').textContent = money.format(totalInt);
    $('#am').innerHTML = rows;
    history.replaceState(null, '', '#' + ids.map((i) => i + '=' + encodeURIComponent($('#' + i).value)).join('&'));
  }
  new URLSearchParams(location.hash.slice(1)).forEach((val, k) => { if (ids.includes(k)) $('#' + k).value = val; });
  ids.forEach((i) => $('#' + i).addEventListener('input', calc));
  calc();
})();
