(() => {
  const { $, copy } = TD;
  const SETS = { up: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', lo: 'abcdefghijklmnopqrstuvwxyz', di: '0123456789', sy: '!@#$%^&*()-_=+[]{};:,.?/~' };
  const AMBIG = /[Il1O0o]/g;
  // Compact word list for passphrases (273 words ≈ 8.1 bits each).
  const WORDS = ('acid acorn actor adapt agent alarm album alert alien alpha amber angle apple april arena armor arrow atlas audio award bacon badge bagel baker bamboo banjo barrel basil beach beard berry bison blade blaze bloom board bonus boost brave bread brick bridge brook brush cabin cable cactus camel candy canoe canyon cargo carrot castle cedar chalk charm chess chief chili cider cliff clock cloud clover cobra comet coral cotton crane crater crisp crown crystal cupid curry daisy dance delta denim desert diary dingo disco dolphin donut dragon dream drift drum eagle earth echo eclipse elbow ember empire engine falcon fable fern fiber fiesta flame flute forest fossil fox frost fudge galaxy garden gecko geyser ginger glacier globe glove gold goose grape gravy guitar habit harbor hazel helmet hero hippo honey horizon hotel husky igloo indigo island ivory jacket jaguar jazz jelly jewel jungle kayak kernel kettle kiwi koala ladder lagoon lantern laser lemon lilac lime lizard llama lobster lotus lunar magnet mango maple marble meadow melon meteor metro mint mocha monkey mosaic motor muffin nectar needle nebula noodle oasis ocean olive omega onion opal orbit otter oxygen paddle panda papaya parrot pasta peach pebble pepper piano pickle pilot pixel planet plaza plum polar poppy prism pumpkin puzzle quartz quill rabbit radar raven reef rhino ribbon river robot rocket rodeo ruby saddle safari salsa sapphire saturn scarf shadow shark sherpa silver sketch sloth snow solar sonic spark spider spruce squid stone storm sugar summit sunset swamp tango temple thunder tiger toast topaz torch tulip tundra turtle umbrella unicorn valley velvet violin vivid volcano waffle walnut wasabi water willow wizard yacht yeti zebra zephyr zinc').split(' ');

  function rand(max) { // unbiased integer in [0, max)
    const limit = Math.floor(0x100000000 / max) * max, a = new Uint32Array(1);
    do crypto.getRandomValues(a); while (a[0] >= limit);
    return a[0] % max;
  }

  const len = $('#len'), lv = $('#lv'), mode = $('#mode'), out = $('#out');

  function generate() {
    let value = '', bits = 0;
    if (mode.value === 'pp') {
      const n = Math.max(3, Math.min(12, +len.value));
      lv.textContent = n + ' words';
      const parts = Array.from({ length: n }, () => WORDS[rand(WORDS.length)]);
      value = parts.join('-') + '-' + rand(100);
      bits = n * Math.log2(WORDS.length) + Math.log2(100);
    } else {
      lv.textContent = len.value;
      const chosen = Object.keys(SETS).filter((k) => $('#' + k).checked);
      if (!chosen.length) { $('#lo').checked = true; chosen.push('lo'); }
      const strip = (s) => ($('#am').checked ? s.replace(AMBIG, '') : s);
      const pools = chosen.map((k) => strip(SETS[k]));
      const all = pools.join('');
      const L = +len.value;
      const chars = pools.map((p) => p[rand(p.length)]); // guarantee one of each selected type
      while (chars.length < L) chars.push(all[rand(all.length)]);
      for (let i = chars.length - 1; i > 0; i--) { const j = rand(i + 1); [chars[i], chars[j]] = [chars[j], chars[i]]; }
      value = chars.slice(0, L).join('');
      bits = L * Math.log2(all.length);
    }
    out.textContent = value;
    const pct = Math.min(100, (bits / 128) * 100);
    const [label, color] = bits < 40 ? ['Weak', 'var(--bad)'] : bits < 60 ? ['Fair', '#fbbf24'] : bits < 80 ? ['Strong', '#a3e635'] : ['Very strong', 'var(--ok)'];
    $('#bar').style.width = pct + '%';
    $('#bar').style.background = color;
    $('#strength').textContent = `${label} · ~${Math.round(bits)} bits of entropy`;
    $('#pwopts').style.display = mode.value === 'pp' ? 'none' : '';
  }

  // Slider means characters for passwords, words for passphrases.
  mode.addEventListener('input', () => {
    const pp = mode.value === 'pp';
    Object.assign(len, pp ? { min: 3, max: 12 } : { min: 6, max: 64 });
    len.value = pp ? 8 : 20;
  });
  [len, mode, ...['up', 'lo', 'di', 'sy', 'am'].map((k) => $('#' + k))].forEach((el) => el.addEventListener('input', generate));
  $('#gen').onclick = generate;
  const bulk = $('#bulk');
  bulk.innerHTML += TD.proBadge();
  bulk.onclick = () => {
    if (!TD.requirePro('Bulk password generation')) return;
    const list = Array.from({ length: 25 }, () => (generate(), out.textContent));
    TD.download('passwords.txt', list.join('\n') + '\n');
  };
  $('#cp').onclick = (e) => copy(out.textContent, e.target);
  generate();
})();
