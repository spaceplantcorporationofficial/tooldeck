(() => {
  const { $, fmtBytes } = TD;
  const drop = $('#drop'), file = $('#file'), results = $('#results'), summary = $('#summary'), allBtn = $('#all');
  const q = $('#q'), qv = $('#qv'), fmt = $('#fmt'), mw = $('#mw');
  let files = [], outputs = [];
  const ext = { 'image/webp': 'webp', 'image/jpeg': 'jpg', 'image/png': 'png' };

  q.oninput = () => (qv.textContent = q.value);
  drop.onclick = () => file.click();
  drop.onkeydown = (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); file.click(); } };
  ['dragenter', 'dragover'].forEach((ev) => drop.addEventListener(ev, (e) => { e.preventDefault(); drop.classList.add('over'); }));
  ['dragleave', 'drop'].forEach((ev) => drop.addEventListener(ev, (e) => { e.preventDefault(); drop.classList.remove('over'); }));
  drop.addEventListener('drop', (e) => load(e.dataTransfer.files));
  file.onchange = () => load(file.files);
  $('#redo').onclick = () => files.length && run();

  function load(list) {
    files = [...list].filter((f) => f.type.startsWith('image/'));
    if (files.length) run();
  }

  async function compress(f) {
    const bmp = await createImageBitmap(f);
    let w = bmp.width, h = bmp.height;
    const max = parseInt(mw.value, 10);
    if (max > 0 && w > max) { h = Math.round((h * max) / w); w = max; }
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    const ctx = c.getContext('2d');
    if (fmt.value === 'image/jpeg') { ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h); }
    ctx.drawImage(bmp, 0, 0, w, h);
    bmp.close && bmp.close();
    const blob = await new Promise((r) => c.toBlob(r, fmt.value, q.value / 100));
    return { blob, w, h };
  }

  async function run() {
    outputs.forEach((o) => URL.revokeObjectURL(o.url));
    outputs = [];
    results.innerHTML = '';
    let before = 0, after = 0;
    for (const f of files) {
      const row = document.createElement('div');
      row.className = 'result';
      row.innerHTML = `<div class="info"><div>${f.name.replace(/</g, '&lt;')}</div><div>Compressing…</div></div>`;
      results.appendChild(row);
      try {
        const { blob, w, h } = await compress(f);
        const url = URL.createObjectURL(blob);
        const name = f.name.replace(/\.[^.]+$/, '') + '-min.' + ext[fmt.value];
        outputs.push({ url, name });
        before += f.size; after += blob.size;
        const pct = Math.round((1 - blob.size / f.size) * 100);
        row.innerHTML = `<img src="${url}" alt=""><div class="info"><div>${name.replace(/</g, '&lt;')}</div>
          <div>${fmtBytes(f.size)} → <b>${fmtBytes(blob.size)}</b> <span class="${pct > 0 ? 'good' : ''}">(${pct > 0 ? '−' + pct : '+' + -pct}%)</span> · ${w}×${h}</div></div>
          <a class="btn" href="${url}" download="${name.replace(/"/g, '')}">Download</a>`;
      } catch (e) {
        row.querySelector('.info div:last-child').textContent = 'Could not read this image.';
      }
    }
    if (outputs.length) {
      summary.hidden = false;
      summary.innerHTML = `<div class="stat"><b>${outputs.length}</b><span>Images</span></div>
        <div class="stat"><b>${fmtBytes(before)}</b><span>Original</span></div>
        <div class="stat"><b>${fmtBytes(after)}</b><span>Compressed</span></div>
        <div class="stat"><b class="good">${Math.max(0, Math.round((1 - after / before) * 100))}%</b><span>Saved</span></div>`;
      allBtn.hidden = outputs.length < 2;
    }
  }
  allBtn.onclick = () => outputs.forEach((o, i) => setTimeout(() => {
    const a = document.createElement('a'); a.href = o.url; a.download = o.name; a.click();
  }, i * 250));
})();
