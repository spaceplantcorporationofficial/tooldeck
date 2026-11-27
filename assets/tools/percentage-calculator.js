(() => {
  const { $ } = TD;
  const f = (x) => (Number.isFinite(x) ? +x.toFixed(6) : NaN).toLocaleString('en-US', { maximumFractionDigits: 4 });
  const num = (id) => parseFloat($('#' + id).value);

  function calc() {
    const a1 = num('a1'), b1 = num('b1'), a2 = num('a2'), b2 = num('b2'), a3 = num('a3'), b3 = num('b3');
    $('#r1').textContent = isNaN(a1) || isNaN(b1) ? 'Enter two numbers' : `${f(a1)}% of ${f(b1)} = ${f((a1 * b1) / 100)}   (${f(b1)} × ${f(a1)} ÷ 100)`;
    $('#r2').textContent = isNaN(a2) || isNaN(b2) ? 'Enter two numbers' : b2 === 0 ? 'Total cannot be zero'
      : `${f(a2)} is ${f((a2 / b2) * 100)}% of ${f(b2)}   (${f(a2)} ÷ ${f(b2)} × 100)`;
    if (isNaN(a3) || isNaN(b3)) $('#r3').textContent = 'Enter two numbers';
    else if (a3 === 0) $('#r3').textContent = 'Starting value cannot be zero';
    else {
      const c = ((b3 - a3) / Math.abs(a3)) * 100;
      $('#r3').textContent = `${c >= 0 ? '▲ +' : '▼ '}${f(c)}% ${c >= 0 ? 'increase' : 'decrease'}   ((${f(b3)} − ${f(a3)}) ÷ |${f(a3)}| × 100)`;
    }
  }
  ['a1', 'b1', 'a2', 'b2', 'a3', 'b3'].forEach((i) => $('#' + i).addEventListener('input', calc));
  calc();
})();
