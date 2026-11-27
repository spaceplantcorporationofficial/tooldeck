(() => {
  const { $, copy } = TD;
  const WORDS = 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure in reprehenderit voluptate velit esse cillum fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum curabitur pretium tincidunt lacus nunc pulvinar sapien ligula vestibulum ante primis faucibus orci luctus ultrices posuere cubilia curae mauris viverra diam vitae suscipit at augue eget arcu dictum varius duis tristique senectus netus malesuada fames ac turpis egestas integer feugiat scelerisque mi facilisis morbi blandit cursus risus quam pellentesque nec nam aliquam sem et tortor consequat'.split(' ');
  const OPENING = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit';
  const rnd = (n) => Math.floor(Math.random() * n);
  const cap = (s) => s[0].toUpperCase() + s.slice(1);

  function sentence() {
    const n = 8 + rnd(10), w = Array.from({ length: n }, () => WORDS[rnd(WORDS.length)]);
    if (n > 10) w[4 + rnd(4)] += ','; // a natural-looking comma
    return cap(w.join(' ')) + '.';
  }
  const paragraph = () => Array.from({ length: 4 + rnd(4) }, sentence).join(' ');

  function generate(count, unit, start) {
    count = Math.max(1, Math.min(unit === 'w' ? 5000 : 100, Math.floor(count) || 1));
    if (unit === 'w') {
      const w = Array.from({ length: count }, () => WORDS[rnd(WORDS.length)]);
      if (start) OPENING.toLowerCase().replace(',', '').split(' ').slice(0, count).forEach((x, i) => (w[i] = x));
      return [cap(w.join(' ')) + '.'];
    }
    const items = Array.from({ length: count }, unit === 's' ? sentence : paragraph);
    if (start) {
      // Replace the first sentence with the classic opening.
      items[0] = unit === 's' ? OPENING + '.' : OPENING + '. ' + items[0].split('. ').slice(1).join('. ');
    }
    return unit === 's' ? [items.join(' ')] : items;
  }

  function render() {
    const paras = generate(+$('#lcount').value, $('#lunit').value, $('#lstart').checked);
    $('#lout').value = $('#lhtml').checked ? paras.map((p) => `<p>${p}</p>`).join('\n') : paras.join('\n\n');
    const words = paras.join(' ').split(/\s+/).filter(Boolean).length;
    $('#lstats').textContent = `${paras.length} paragraph${paras.length === 1 ? '' : 's'} · ${words} words · ${paras.join(' ').length} characters`;
  }
  ['lcount', 'lunit', 'lstart', 'lhtml'].forEach((i) => $('#' + i).addEventListener('input', render));
  $('#lgen').onclick = render;
  $('#lcopy').onclick = (e) => copy($('#lout').value, e.target);
  render();
  window.__lorem = generate;
})();
