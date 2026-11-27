(() => {
  const { $ } = TD;
  const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
  const ids = ['p', 'c', 'r', 'y', 'n'];

  function calc() {
    const P = Math.max(0, +$('#p').value || 0), C = Math.max(0, +$('#c').value || 0);
    const r = Math.max(0, +$('#r').value || 0) / 100, Y = Math.min(100, Math.max(1, Math.round(+$('#y').value || 1)));
    const n = +$('#n').value;
    const monthly = Math.pow(1 + r / n, n / 12) - 1; // effective monthly rate for chosen compounding
    let bal = P, contributed = P, rows = '';
    for (let year = 1; year <= Y; year++) {
      for (let m = 0; m < 12; m++) { bal = bal * (1 + monthly) + C; contributed += C; }
      rows += `<tr><td>${year}</td><td>${money.format(contributed)}</td><td>${money.format(bal - contributed)}</td><td><b>${money.format(bal)}</b></td></tr>`;
    }
    $('#fv').textContent = money.format(bal);
    $('#tc').textContent = money.format(contributed);
    $('#ti').textContent = money.format(bal - contributed);
    $('#tbl').innerHTML = rows;
    history.replaceState(null, '', '#' + ids.map((i) => i + '=' + encodeURIComponent($('#' + i).value)).join('&'));
  }

  // Restore shared links like #p=10000&c=500&r=7&y=20&n=12
  new URLSearchParams(location.hash.slice(1)).forEach((v, k) => { if (ids.includes(k)) $('#' + k).value = v; });
  ids.forEach((i) => $('#' + i).addEventListener('input', calc));
  calc();
})();
