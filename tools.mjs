// Tool registry. To ship a new tool: add an entry here + assets/tools/<slug>.js, then `npm run check`.
export default [
  {
    slug: 'image-compressor',
    emoji: '🗜️',
    category: 'Images',
    name: 'Image Compressor & Converter',
    title: 'Free Image Compressor – Compress JPG, PNG & WebP Online',
    description: 'Compress and convert images to WebP, JPG or PNG right in your browser. Batch resize photos, cut file size up to 90%, no uploads, 100% private.',
    h1: 'Compress & Convert Images Instantly',
    lead: 'Shrink JPG, PNG and WebP files in bulk. Everything happens on your device, so your photos never leave your computer.',
    appCategory: 'MultimediaApplication',
    body: `
<div class="card">
  <div class="drop" id="drop" tabindex="0" role="button" aria-label="Choose images">
    <strong>Drop images here</strong> or click to choose (JPG, PNG, WebP, GIF)
    <input id="file" type="file" accept="image/*" multiple class="sr">
  </div>
  <div class="row">
    <div><label for="fmt">Output format</label>
      <select id="fmt"><option value="image/webp">WebP (smallest)</option><option value="image/jpeg">JPG</option><option value="image/png">PNG (lossless)</option></select></div>
    <div><label for="q">Quality: <span id="qv">75</span>%</label><input id="q" type="range" min="10" max="100" value="75"></div>
    <div><label for="mw">Max width (px, optional)</label><input id="mw" type="number" min="16" placeholder="e.g. 1920"></div>
  </div>
  <div class="btns"><button id="redo" class="secondary">Re-compress with new settings</button><button id="all" class="secondary" hidden>Download all</button></div>
  <div class="stats" id="summary" hidden></div>
  <div class="results" id="results"></div>
</div>`,
    howto: [
      'Drop one or more images onto the box, or click it to pick files.',
      'Choose an output format. WebP usually gives the smallest files; PNG keeps every pixel.',
      'Adjust quality and an optional max width to resize large photos.',
      'Download each image, or grab them all at once.'
    ],
    faq: [
      ['Are my images uploaded to a server?', 'No. Compression runs entirely in your browser using the HTML canvas API. Your files never leave your device, which also makes it fast.'],
      ['Which format should I choose?', 'WebP is supported by all modern browsers and is typically 25–35% smaller than JPG at the same visual quality. Use JPG for maximum compatibility and PNG when you need lossless quality or transparency without artifacts.'],
      ['What quality setting is best?', 'For photos on the web, 70–80% is a great balance; most people cannot see a difference from the original, while file sizes drop dramatically.'],
      ['Is there a file size or count limit?', 'There is no artificial limit. Very large images depend on your device memory, but typical photos of 5–20 MB work fine.']
    ]
  },
  {
    slug: 'json-formatter',
    emoji: '🧩',
    category: 'Developer',
    name: 'JSON Formatter & Validator',
    title: 'JSON Formatter & Validator – Beautify, Minify & Fix JSON',
    description: 'Format, beautify, minify and validate JSON online. Get exact line and column for syntax errors, sort keys and copy results. Fast, free and private.',
    h1: 'JSON Formatter, Validator & Minifier',
    lead: 'Paste JSON to pretty-print it, minify it, or pinpoint the exact line and column of a syntax error.',
    appCategory: 'DeveloperApplication',
    body: `
<div class="card">
  <label for="in">JSON input</label>
  <textarea id="in" spellcheck="false" placeholder='{"hello": "world", "list": [1, 2, 3]}'></textarea>
  <div class="row">
    <div><label for="indent">Indentation</label><select id="indent"><option value="2">2 spaces</option><option value="4">4 spaces</option><option value="tab">Tabs</option></select></div>
    <div><label class="check" style="margin-top:34px"><input type="checkbox" id="sort"> Sort keys A→Z</label></div>
  </div>
  <div class="btns">
    <button id="fmtBtn">Format</button><button id="minBtn" class="secondary">Minify</button>
    <button id="valBtn" class="secondary">Validate</button><button id="copyBtn" class="secondary">Copy</button>
    <button id="clearBtn" class="secondary">Clear</button>
  </div>
  <div id="msg" class="msg" role="status"></div>
  <div class="stats" id="jstats"></div>
</div>`,
    howto: [
      'Paste or type JSON into the box.',
      'Click Format to pretty-print with your chosen indentation, or Minify to strip whitespace.',
      'If the JSON is invalid you will see the exact line and column of the problem.',
      'Optionally sort object keys alphabetically, then copy the result.'
    ],
    faq: [
      ['Is my JSON sent anywhere?', 'No. Parsing and formatting use your browser\'s built-in JSON engine. Nothing is uploaded, so it is safe for API keys, configs and private data.'],
      ['Why is my JSON invalid?', 'The most common causes are trailing commas, single quotes instead of double quotes, unquoted keys, and comments. The validator shows the line and column where parsing failed.'],
      ['What does minify do?', 'Minifying removes all unnecessary whitespace and line breaks, producing the smallest valid JSON. It is ideal for payloads, configs and storage.'],
      ['Can it handle large files?', 'Yes. Multi-megabyte JSON documents format in milliseconds on most devices.']
    ]
  },
  {
    slug: 'compound-interest-calculator',
    emoji: '📈',
    category: 'Finance',
    name: 'Compound Interest Calculator',
    title: 'Compound Interest Calculator with Monthly Contributions',
    description: 'See how your money grows with compound interest. Add monthly contributions, choose compounding frequency and get a year-by-year growth table. Free.',
    h1: 'Compound Interest Calculator',
    lead: 'Find out what your savings or investments could be worth, with regular contributions and a clear year-by-year breakdown.',
    appCategory: 'FinanceApplication',
    body: `
<div class="card">
  <div class="row">
    <div><label for="p">Initial deposit ($)</label><input id="p" type="number" min="0" value="10000"></div>
    <div><label for="c">Monthly contribution ($)</label><input id="c" type="number" min="0" value="500"></div>
    <div><label for="r">Annual interest rate (%)</label><input id="r" type="number" min="0" step="0.1" value="7"></div>
    <div><label for="y">Years</label><input id="y" type="number" min="1" max="100" value="20"></div>
    <div><label for="n">Compounding</label><select id="n"><option value="12">Monthly</option><option value="4">Quarterly</option><option value="1">Annually</option><option value="365">Daily</option></select></div>
  </div>
  <div class="stats">
    <div class="stat"><b id="fv">–</b><span>Future value</span></div>
    <div class="stat"><b id="tc">–</b><span>Total contributed</span></div>
    <div class="stat"><b id="ti" class="good">–</b><span>Interest earned</span></div>
  </div>
  <div style="overflow-x:auto"><table><thead><tr><th>Year</th><th>Contributed</th><th>Interest</th><th>Balance</th></tr></thead><tbody id="tbl"></tbody></table></div>
</div>`,
    howto: [
      'Enter your starting amount and how much you plan to add each month.',
      'Set the expected annual return and the number of years.',
      'Pick how often interest compounds. Results update instantly.',
      'Scroll the table to see your balance at the end of each year.'
    ],
    faq: [
      ['What is compound interest?', 'Compound interest is interest earned on both your original money and on the interest it has already earned. Over long periods this snowball effect makes growth accelerate.'],
      ['What rate of return should I use?', 'High-yield savings accounts may pay 3–5% per year. Broad stock market index funds have historically averaged around 7% per year after inflation, but returns vary and are not guaranteed.'],
      ['Does compounding frequency matter much?', 'Slightly. More frequent compounding earns a bit more, but the difference between monthly and daily is small. The rate, the time horizon and your contributions matter far more.'],
      ['Is this financial advice?', 'No. This calculator is for educational estimates only and does not account for taxes, fees or inflation.']
    ]
  },
  {
    slug: 'word-counter',
    emoji: '📝',
    category: 'Writing',
    name: 'Word Counter & Keyword Density',
    title: 'Word Counter – Characters, Reading Time & Keyword Density',
    description: 'Count words, characters, sentences and paragraphs as you type. See reading and speaking time plus top keyword density for SEO writing. Free, private.',
    h1: 'Word Counter & Keyword Density Checker',
    lead: 'Live word and character counts, reading time, and the keywords you use most. Perfect for essays, blog posts and social media.',
    appCategory: 'UtilitiesApplication',
    body: `
<div class="card">
  <label for="txt">Your text</label>
  <textarea id="txt" placeholder="Start typing or paste your text here…"></textarea>
  <div class="stats">
    <div class="stat"><b id="w">0</b><span>Words</span></div>
    <div class="stat"><b id="ch">0</b><span>Characters</span></div>
    <div class="stat"><b id="chns">0</b><span>Characters (no spaces)</span></div>
    <div class="stat"><b id="s">0</b><span>Sentences</span></div>
    <div class="stat"><b id="pa">0</b><span>Paragraphs</span></div>
    <div class="stat"><b id="rt">0 min</b><span>Reading time</span></div>
    <div class="stat"><b id="st">0 min</b><span>Speaking time</span></div>
  </div>
  <h3 style="margin-top:22px">Top keywords</h3>
  <div style="overflow-x:auto"><table><thead><tr><th>Keyword</th><th>Count</th><th>Density</th></tr></thead><tbody id="kw"><tr><td colspan="3" style="text-align:left;color:var(--muted)">Type some text to see keyword density.</td></tr></tbody></table></div>
  <div class="btns"><button id="copyT" class="secondary">Copy text</button><button id="clearT" class="secondary">Clear</button></div>
</div>`,
    howto: [
      'Type or paste text into the box. All counts update live.',
      'Check reading time (238 words per minute) and speaking time (130 words per minute).',
      'Use the keyword table to spot overused words and check SEO keyword density.'
    ],
    faq: [
      ['How are words counted?', 'Any run of letters, numbers, apostrophes or hyphens separated by spaces or punctuation counts as one word, matching how most word processors count.'],
      ['How is reading time calculated?', 'Reading time assumes an average adult silent reading speed of 238 words per minute. Speaking time uses 130 words per minute, a typical presentation pace.'],
      ['What is a good keyword density for SEO?', 'There is no magic number. Write naturally for readers; if a single keyword is well above 2–3% of your words, the text may read as repetitive.'],
      ['Is my text saved or uploaded?', 'No. Everything is processed locally in your browser and disappears when you close the page.']
    ]
  },
  {
    slug: 'password-generator',
    emoji: '🔐',
    category: 'Security',
    name: 'Secure Password Generator',
    title: 'Strong Password Generator – Random & Secure Passwords',
    description: 'Generate strong, truly random passwords and passphrases with cryptographic randomness. Choose length and characters and see entropy strength. Free.',
    h1: 'Strong Password Generator',
    lead: 'Create uncrackable passwords using your browser\'s cryptographically secure random number generator. Nothing is stored or sent.',
    appCategory: 'SecurityApplication',
    body: `
<div class="card">
  <div class="row">
    <div><label for="mode">Type</label><select id="mode"><option value="pw">Random password</option><option value="pp">Memorable passphrase</option></select></div>
    <div><label for="len">Length: <span id="lv">20</span></label><input id="len" type="range" min="6" max="64" value="20"></div>
  </div>
  <div id="pwopts" class="row">
    <label class="check"><input type="checkbox" id="up" checked> Uppercase A–Z</label>
    <label class="check"><input type="checkbox" id="lo" checked> Lowercase a–z</label>
    <label class="check"><input type="checkbox" id="di" checked> Numbers 0–9</label>
    <label class="check"><input type="checkbox" id="sy" checked> Symbols !@#$</label>
    <label class="check"><input type="checkbox" id="am"> Avoid look-alikes (Il1O0)</label>
  </div>
  <div class="out" id="out" aria-live="polite"></div>
  <div class="meter"><i id="bar"></i></div>
  <div class="msg" id="strength"></div>
  <div class="btns"><button id="gen">Generate new</button><button id="cp" class="secondary">Copy</button></div>
</div>`,
    howto: [
      'Choose a random password or a memorable multi-word passphrase.',
      'Set the length and character types you need.',
      'Check the entropy meter: aim for 80+ bits for important accounts.',
      'Copy it into your password manager.'
    ],
    faq: [
      ['Are these passwords truly random?', 'Yes. They use crypto.getRandomValues, the cryptographically secure random generator built into your browser, with unbiased sampling.'],
      ['Is the password sent or saved anywhere?', 'No. Passwords are generated on your device and never transmitted or stored.'],
      ['How long should my password be?', 'At least 16 characters for random passwords, or 5–6 words for passphrases. Longer is always stronger.'],
      ['What is entropy?', 'Entropy measures how unpredictable a password is, in bits. Each extra bit doubles the guesses an attacker needs. 80 bits or more is considered very strong.']
    ]
  }
];
