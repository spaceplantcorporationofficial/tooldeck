(() => {
  const { $ } = TD;
  const local = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
  const ZONES = (Intl.supportedValuesOf ? Intl.supportedValuesOf('timeZone') : ['UTC', 'America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles', 'Europe/London', 'Europe/Paris', 'Europe/Berlin', 'Asia/Kolkata', 'Asia/Shanghai', 'Asia/Tokyo', 'Australia/Sydney']);
  if (!ZONES.includes('UTC')) ZONES.unshift('UTC');
  const DEFAULT = [...new Set([local, 'America/New_York', 'America/Los_Angeles', 'Europe/London', 'Asia/Kolkata', 'Asia/Tokyo'])];
  let shown = DEFAULT.slice();

  // Offset (minutes) of zone at a UTC instant.
  function offset(zone, ms) {
    const p = Object.fromEntries(new Intl.DateTimeFormat('en-US', { timeZone: zone, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })
      .formatToParts(new Date(ms)).filter((x) => x.type !== 'literal').map((x) => [x.type, +x.value]));
    return (Date.UTC(p.year, p.month - 1, p.day, p.hour % 24, p.minute, p.second) - Math.floor(ms / 1000) * 1000) / 60000;
  }
  // UTC instant for a wall-clock time in zone. Handles DST like Temporal's "compatible" mode:
  // repeated times (fall back) use the earlier instant; skipped times (spring forward) move forward.
  function toUTC(y, mo, d, h, mi, zone) {
    const wall = Date.UTC(y, mo - 1, d, h, mi), H12 = 12 * 3600000;
    const oBefore = offset(zone, wall - H12), oAfter = offset(zone, wall + H12);
    const cands = [wall - oBefore * 60000, wall - oAfter * 60000];
    const valid = cands.filter((ms) => wall - offset(zone, ms) * 60000 === ms);
    return valid.length ? Math.min(...valid) : cands[0];
  }
  const fmtOff = (m) => 'UTC' + (m >= 0 ? '+' : '−') + String(Math.floor(Math.abs(m) / 60)).padStart(2, '0') + ':' + String(Math.abs(m) % 60).padStart(2, '0');
  const label = (z) => z.replace(/_/g, ' ').replace(/\//g, ' / ');

  const opts = ZONES.map((z) => `<option value="${z}">${label(z)}</option>`).join('');
  $('#tzfrom').innerHTML = opts; $('#tzadd').innerHTML = opts;
  $('#tzfrom').value = local; $('#tzadd').value = 'Europe/Paris';

  function setNow() {
    const n = new Date(), o = offset($('#tzfrom').value, n.getTime());
    $('#tzdt').value = new Date(n.getTime() + o * 60000).toISOString().slice(0, 16);
  }

  function render() {
    const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec($('#tzdt').value);
    if (!m) { $('#tztbl').innerHTML = ''; return; }
    const ms = toUTC(+m[1], +m[2], +m[3], +m[4], +m[5], $('#tzfrom').value);
    $('#tztbl').innerHTML = shown.map((z) => {
      const t = new Date(ms).toLocaleString('en-US', { timeZone: z, weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
      return `<tr><td>${label(z)}${z === local ? ' (you)' : ''}</td><td><b>${t}</b></td><td>${fmtOff(offset(z, ms))}</td><td><button class="secondary" data-rm="${z}" aria-label="Remove ${label(z)}" style="padding:4px 10px">×</button></td></tr>`;
    }).join('');
    history.replaceState(null, '', '#' + encodeURIComponent([$('#tzdt').value, $('#tzfrom').value, ...shown].join('|')));
  }

  const h = decodeURIComponent(location.hash.slice(1)).split('|');
  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(h[0] || '') && ZONES.includes(h[1])) {
    $('#tzdt').value = h[0]; $('#tzfrom').value = h[1];
    const z = h.slice(2).filter((x) => ZONES.includes(x)); if (z.length) shown = z;
  } else setNow();

  $('#tzdt').addEventListener('input', render);
  $('#tzfrom').addEventListener('input', render);
  $('#tznow').onclick = () => { setNow(); render(); };
  $('#tzaddbtn').onclick = () => { const z = $('#tzadd').value; if (!shown.includes(z)) shown.push(z); render(); };
  $('#tztbl').addEventListener('click', (e) => { const z = e.target.dataset && e.target.dataset.rm; if (z) { shown = shown.filter((x) => x !== z); render(); } });
  render();
  window.__tz = { offset, toUTC };
})();
