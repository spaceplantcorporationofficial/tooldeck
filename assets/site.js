// Shared helpers for every tool page.
window.TD = {
  cfg: window.TD_CFG || {},
  $: (s, r = document) => r.querySelector(s),
  fmtBytes(n) {
    if (n < 1024) return n + ' B';
    if (n < 1048576) return (n / 1024).toFixed(1) + ' KB';
    return (n / 1048576).toFixed(2) + ' MB';
  },
  async copy(text, btn) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const t = document.createElement('textarea');
      t.value = text; document.body.appendChild(t); t.select();
      document.execCommand('copy'); t.remove();
    }
    if (btn) { const o = btn.textContent; btn.textContent = 'Copied!'; setTimeout(() => (btn.textContent = o), 1200); }
  },
  download(name, text, type = 'text/plain') {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([text], { type }));
    a.download = name; a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  },

  // ---- Tooldeck Pro (Stripe Payment Link, one-time unlock) ----
  proEnabled() { return !!this.cfg.proLink; },
  isPro() { try { return localStorage.getItem('td-pro') === '1'; } catch { return false; } },
  proHref() {
    const l = this.cfg.proLink;
    return l + (l.includes('?') ? '&' : '?') + 'client_reference_id=' + encodeURIComponent('pro-' + (this.cfg.slug || 'site'));
  },
  // Returns true if the feature may run. Pro gating only applies once a Pro link is configured.
  requirePro(feature) {
    if (!this.proEnabled() || this.isPro()) return true;
    let m = document.getElementById('td-pro-modal');
    if (!m) {
      m = document.createElement('div');
      m.id = 'td-pro-modal';
      m.innerHTML = `<div class="card pro-modal" role="dialog" aria-modal="true" aria-labelledby="td-pro-h">
        <h2 id="td-pro-h" style="margin-top:0">⚡ Unlock Tooldeck Pro</h2>
        <p><b id="td-pro-f"></b> is a Pro feature.</p>
        <ul><li>CSV export on every calculator &amp; table</li><li>Unlimited image batch compression</li><li>Bulk passwords &amp; UUIDs</li><li>Every future Pro feature, on every tool</li></ul>
        <p><b>${this.cfg.proPrice || ''} one-time.</b> No subscription, no account.</p>
        <div class="btns"><a class="btn" id="td-pro-buy" target="_blank" rel="noopener">Get Pro</a><button class="secondary" id="td-pro-close">Maybe later</button></div>
        <p style="font-size:.85rem;color:var(--muted)">Secure checkout by Stripe. Already bought? <a href="${this.cfg.root || ''}pro/thanks/">Restore Pro</a></p></div>`;
      document.body.appendChild(m);
      m.addEventListener('click', (e) => { if (e.target === m || e.target.id === 'td-pro-close') m.hidden = true; });
      document.addEventListener('keydown', (e) => { if (e.key === 'Escape') m.hidden = true; });
    }
    m.querySelector('#td-pro-f').textContent = feature;
    m.querySelector('#td-pro-buy').href = this.proHref();
    m.hidden = false;
    m.querySelector('#td-pro-buy').focus();
    return false;
  },
  proBadge() { return this.proEnabled() && !this.isPro() ? ' <span class="pro-badge">PRO</span>' : ''; },

  // CSV export (Pro) for every results table inside a tool card.
  tableCSV(table) {
    return [...table.rows].map((r) => [...r.cells].map((c) => {
      const t = c.textContent.trim();
      return /[",\n]/.test(t) ? '"' + t.replace(/"/g, '""') + '"' : t;
    }).join(',')).join('\n');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('main .card table').forEach((table) => {
    const b = document.createElement('button');
    b.className = 'secondary';
    b.type = 'button';
    b.style.marginTop = '10px';
    b.innerHTML = '⬇ Export CSV' + TD.proBadge();
    b.onclick = () => {
      if (!TD.requirePro('CSV export')) return;
      TD.download((TD.cfg.slug || 'tooldeck') + '.csv', TD.tableCSV(table), 'text/csv');
    };
    table.parentElement.insertAdjacentElement('afterend', b);
  });
});
