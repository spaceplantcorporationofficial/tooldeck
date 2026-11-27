// Shared helpers for every tool page.
window.TD = {
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
  }
};
