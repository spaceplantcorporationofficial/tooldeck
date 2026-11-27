(() => {
  const { $ } = TD;
  const money = (x) => '$' + x.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const emi = (P, annual, months) => {
    const r = annual / 100 / 12;
    if (months <= 0) return P;
    return r === 0 ? P / months : (P * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
  };
  // Month-by-month schedule with an optional extra payment applied to principal.
  function schedule(P, annual, months, extra = 0) {
    const r = annual / 100 / 12, pay = emi(P, annual, months), rows = [];
    let bal = P, totalInt = 0;
    while (bal > 0.005 && rows.length < 1200) {
      const i = bal * r, princ = Math.min(bal, pay + extra - i);
      if (princ <= 0) break; // payment does not cover interest
      bal -= princ; totalInt += i;
      rows.push({ m: rows.length + 1, pay: princ + i, princ, i, bal: Math.max(0, bal) });
    }
    return { pay, rows, totalInt };
  }

  function calc() {
    const P = Math.max(0, +$('#lamt').value || 0), rate = Math.max(0, +$('#lrate').value || 0);
    const months = Math.round(Math.max(0, +$('#lyears').value || 0) * 12), extra = Math.max(0, +$('#lextra').value || 0);
    if (!P || !months) { $('#lpay').textContent = '–'; $('#lsched').innerHTML = ''; return; }
    const base = schedule(P, rate, months), fast = schedule(P, rate, months, extra);
    $('#lpay').textContent = money(base.pay) + (extra ? ` (+${money(extra)})` : '');
    $('#lint').textContent = money(base.totalInt);
    $('#ltotal').textContent = money(P + base.totalInt);
    $('#lsave').textContent = extra ? money(base.totalInt - fast.totalInt) : '–';
    const sooner = base.rows.length - fast.rows.length;
    $('#lsooner').textContent = extra ? `${Math.floor(sooner / 12)}y ${sooner % 12}m` : '–';
    $('#lsched').innerHTML = (extra ? fast : base).rows.map((r) => `<tr><td>${r.m}</td><td>${money(r.pay)}</td><td>${money(r.princ)}</td><td>${money(r.i)}</td><td>${money(r.bal)}</td></tr>`).join('');
  }
  ['lamt', 'lrate', 'lyears', 'lextra'].forEach((i) => $('#' + i).addEventListener('input', calc));
  calc();
  window.__loan = { emi, schedule };
})();
