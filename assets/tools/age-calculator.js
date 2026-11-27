(() => {
  const { $ } = TD;
  const DAY = 86400000;
  const parse = (s) => { const [y, m, d] = s.split('-').map(Number); return y ? new Date(Date.UTC(y, m - 1, d)) : null; };
  const iso = (d) => d.toISOString().slice(0, 10);
  const dim = (y, m) => new Date(Date.UTC(y, m + 1, 0)).getUTCDate(); // days in month m (0-based)

  // Add k months to date a, clamping the day to the end of the target month (Jan 31 + 1 month = Feb 28/29).
  function addMonths(a, k) {
    const y = a.getUTCFullYear() + Math.floor((a.getUTCMonth() + k) / 12), m = (a.getUTCMonth() + k) % 12;
    return new Date(Date.UTC(y, m, Math.min(a.getUTCDate(), dim(y, m))));
  }
  // Exact age: the largest whole number of months that fits, then the remaining days.
  function diff(a, b) {
    let k = (b.getUTCFullYear() - a.getUTCFullYear()) * 12 + (b.getUTCMonth() - a.getUTCMonth());
    while (k > 0 && addMonths(a, k) > b) k--;
    const d = Math.round((b - addMonths(a, k)) / DAY);
    return { y: Math.floor(k / 12), m: k % 12, d };
  }
  // Birthday in a given year; Feb 29 maps to Feb 28 in non-leap years (matches the month clamping in diff).
  function bdayIn(dob, year) {
    const m = dob.getUTCMonth(), d = dob.getUTCDate();
    if (m === 1 && d === 29 && dim(year, 1) === 28) return new Date(Date.UTC(year, 1, 28));
    return new Date(Date.UTC(year, m, d));
  }

  function calc() {
    const a = parse($('#dob').value), b = parse($('#asof').value);
    if (!a || !b) { $('#agemain').textContent = 'Pick a date of birth.'; return; }
    if (a > b) { $('#agemain').textContent = 'Date of birth must be before the "age on" date.'; return; }
    const { y, m, d } = diff(a, b);
    $('#agemain').textContent = `${y} year${y === 1 ? '' : 's'}, ${m} month${m === 1 ? '' : 's'}, ${d} day${d === 1 ? '' : 's'}`;
    let next = bdayIn(a, b.getUTCFullYear());
    if (next <= b) next = bdayIn(a, b.getUTCFullYear() + 1);
    const days = Math.round((next - b) / DAY);
    $('#nextbd').textContent = days + (days === 1 ? ' day' : ' days');
    $('#bornday').textContent = a.toLocaleDateString('en-US', { weekday: 'long', timeZone: 'UTC' });
    $('#turning').textContent = next.getUTCFullYear() - a.getUTCFullYear();
    const totalDays = Math.round((b - a) / DAY);
    const rows = [['Years', y], ['Months', y * 12 + m], ['Weeks', Math.floor(totalDays / 7)], ['Days', totalDays], ['Hours', totalDays * 24], ['Minutes', totalDays * 1440]];
    $('#agetbl').innerHTML = rows.map(([u, v]) => `<tr><td>${u}</td><td>${v.toLocaleString('en-US')}</td></tr>`).join('');
    history.replaceState(null, '', '#dob=' + $('#dob').value);
  }

  const now = new Date();
  $('#asof').value = iso(new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())));
  const h = new URLSearchParams(location.hash.slice(1)).get('dob');
  if (h && parse(h)) $('#dob').value = h;
  $('#dob').addEventListener('input', calc);
  $('#asof').addEventListener('input', calc);
  calc();
  window.__age = { diff, bdayIn, parse }; // exposed for tests
})();
