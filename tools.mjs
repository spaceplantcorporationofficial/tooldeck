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
  <div class="btns"><button id="gen">Generate new</button><button id="cp" class="secondary">Copy</button><button id="bulk" class="secondary">Generate 25 &amp; download</button></div>
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
  },
  {
    slug: 'mortgage-calculator',
    emoji: '🏠',
    category: 'Finance',
    name: 'Mortgage Calculator',
    title: 'Mortgage Calculator – Monthly Payment with Taxes & PMI',
    description: 'Estimate your monthly mortgage payment including principal, interest, property tax, insurance and HOA. See total interest and a yearly amortization table.',
    h1: 'Mortgage Payment Calculator',
    lead: 'Work out your real monthly housing cost, not just principal and interest, and see how your loan balance falls each year.',
    appCategory: 'FinanceApplication',
    body: `
<div class="card">
  <div class="row">
    <div><label for="price">Home price ($)</label><input id="price" type="number" min="0" value="400000"></div>
    <div><label for="down">Down payment (%)</label><input id="down" type="number" min="0" max="100" step="0.5" value="20"></div>
    <div><label for="rate">Interest rate (%)</label><input id="rate" type="number" min="0" step="0.05" value="6.5"></div>
    <div><label for="term">Loan term</label><select id="term"><option value="30">30 years</option><option value="20">20 years</option><option value="15">15 years</option><option value="10">10 years</option></select></div>
    <div><label for="tax">Property tax (%/yr)</label><input id="tax" type="number" min="0" step="0.05" value="1.1"></div>
    <div><label for="ins">Home insurance ($/yr)</label><input id="ins" type="number" min="0" value="1500"></div>
    <div><label for="hoa">HOA ($/month)</label><input id="hoa" type="number" min="0" value="0"></div>
    <div><label for="pmi">PMI (%/yr if &lt;20% down)</label><input id="pmi" type="number" min="0" step="0.05" value="0.5"></div>
  </div>
  <div class="stats">
    <div class="stat"><b id="mtotal">–</b><span>Total monthly payment</span></div>
    <div class="stat"><b id="mpi">–</b><span>Principal &amp; interest</span></div>
    <div class="stat"><b id="mextra">–</b><span>Tax, insurance, HOA &amp; PMI</span></div>
    <div class="stat"><b id="mloan">–</b><span>Loan amount</span></div>
    <div class="stat"><b id="mint">–</b><span>Total interest</span></div>
  </div>
  <div style="overflow-x:auto"><table><thead><tr><th>Year</th><th>Principal paid</th><th>Interest paid</th><th>Remaining balance</th></tr></thead><tbody id="am"></tbody></table></div>
</div>`,
    howto: [
      'Enter the home price, your down payment percentage and the interest rate you were quoted.',
      'Pick the loan term and fill in property tax, insurance and any HOA dues.',
      'If you put down less than 20%, set your PMI rate (typically 0.3–1.5% per year).',
      'Review your total monthly payment and the amortization table.'
    ],
    faq: [
      ['How is the monthly mortgage payment calculated?', 'Principal and interest use the standard amortization formula M = L·r / (1 − (1 + r)^−n), where L is the loan amount, r the monthly rate and n the number of payments. Taxes, insurance, HOA and PMI are then added.'],
      ['What is PMI?', 'Private mortgage insurance is usually required on conventional loans with less than 20% down. It typically costs 0.3–1.5% of the loan per year and can be removed once you reach about 20% equity.'],
      ['Should I choose a 15-year or 30-year mortgage?', 'A 15-year loan has higher monthly payments but usually a lower rate and far less total interest. A 30-year loan keeps payments lower and more flexible.'],
      ['Is this an official loan quote?', 'No. It is an estimate for planning. Lenders will factor in your credit, fees and local taxes.']
    ]
  },
  {
    slug: 'percentage-calculator',
    emoji: '➗',
    category: 'Finance',
    name: 'Percentage Calculator',
    title: 'Percentage Calculator – Percent Of, Change & Difference',
    description: 'Calculate percentages instantly: what is X% of Y, X is what percent of Y, and percentage increase or decrease between two numbers. Shows the formula too.',
    h1: 'Percentage Calculator',
    lead: 'Three of the most common percentage questions, answered as you type, with the formula shown so you can check the math.',
    appCategory: 'UtilitiesApplication',
    body: `
<div class="card">
  <h3>What is X% of Y?</h3>
  <div class="row"><div><label for="a1">Percent (%)</label><input id="a1" type="number" value="15"></div><div><label for="b1">Of value</label><input id="b1" type="number" value="80"></div></div>
  <div class="out" id="r1"></div>
  <h3 style="margin-top:22px">X is what percent of Y?</h3>
  <div class="row"><div><label for="a2">Value X</label><input id="a2" type="number" value="30"></div><div><label for="b2">Total Y</label><input id="b2" type="number" value="120"></div></div>
  <div class="out" id="r2"></div>
  <h3 style="margin-top:22px">Percentage change from X to Y</h3>
  <div class="row"><div><label for="a3">From</label><input id="a3" type="number" value="50"></div><div><label for="b3">To</label><input id="b3" type="number" value="65"></div></div>
  <div class="out" id="r3"></div>
</div>`,
    howto: [
      'Pick the question that matches your problem.',
      'Type your two numbers. The answer and formula update instantly.',
      'For discounts, use "X% of Y" and subtract the result from the price.'
    ],
    faq: [
      ['How do I calculate a percentage of a number?', 'Multiply the number by the percentage and divide by 100. For example, 15% of 80 is 80 × 15 / 100 = 12.'],
      ['How do I find what percent one number is of another?', 'Divide the part by the whole and multiply by 100. For example, 30 out of 120 is 30 / 120 × 100 = 25%.'],
      ['How is percentage change calculated?', 'Subtract the old value from the new value, divide by the old value and multiply by 100. Going from 50 to 65 is (65 − 50) / 50 × 100 = +30%.'],
      ['What is the difference between percent change and percentage points?', 'If a rate rises from 4% to 5%, that is a 1 percentage point increase but a 25% relative increase.']
    ]
  },
  {
    slug: 'case-converter',
    emoji: '🔠',
    category: 'Writing',
    name: 'Case Converter',
    title: 'Case Converter – UPPER, lower, Title, camelCase & snake_case',
    description: 'Convert text to uppercase, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, kebab-case or CONSTANT_CASE with one click. Free.',
    h1: 'Text Case Converter',
    lead: 'Fix accidental caps lock, format headlines, or turn phrases into variable names, instantly.',
    appCategory: 'UtilitiesApplication',
    body: `
<div class="card">
  <label for="ct">Text</label>
  <textarea id="ct" placeholder="Type or paste text, then pick a case…"></textarea>
  <div class="btns" id="cases">
    <button data-c="upper">UPPERCASE</button><button data-c="lower" class="secondary">lowercase</button>
    <button data-c="title" class="secondary">Title Case</button><button data-c="sentence" class="secondary">Sentence case</button>
    <button data-c="camel" class="secondary">camelCase</button><button data-c="pascal" class="secondary">PascalCase</button>
    <button data-c="snake" class="secondary">snake_case</button><button data-c="kebab" class="secondary">kebab-case</button>
    <button data-c="constant" class="secondary">CONSTANT_CASE</button><button data-c="alt" class="secondary">aLtErNaTiNg</button>
  </div>
  <div class="btns"><button id="ccopy">Copy</button><button id="cclear" class="secondary">Clear</button></div>
</div>`,
    howto: [
      'Paste or type your text.',
      'Click any case button to convert the text in place.',
      'Copy the result with one click.'
    ],
    faq: [
      ['What is Title Case?', 'Title Case capitalizes the main words of a headline. This tool keeps short words such as "a", "and", "of" and "the" lowercase unless they start the title, following common style guides.'],
      ['What is the difference between camelCase and PascalCase?', 'Both join words without spaces. camelCase starts with a lowercase letter (myVariableName), while PascalCase capitalizes every word (MyVariableName).'],
      ['When should I use snake_case or kebab-case?', 'snake_case is common in Python and databases; kebab-case is used in URLs, CSS classes and file names. CONSTANT_CASE is used for constants and environment variables.'],
      ['Is my text stored?', 'No. Conversion happens entirely in your browser.']
    ]
  },
  {
    slug: 'base64-encoder-decoder',
    emoji: '🔁',
    category: 'Developer',
    name: 'Base64 Encoder & Decoder',
    title: 'Base64 Encode & Decode Online – Text, URL-safe & Files',
    description: 'Encode text to Base64 or decode Base64 back to text with full UTF-8 and emoji support. URL-safe mode and file to Base64 data URI conversion included.',
    h1: 'Base64 Encoder & Decoder',
    lead: 'Convert text and files to and from Base64, with proper Unicode handling and a URL-safe option.',
    appCategory: 'DeveloperApplication',
    body: `
<div class="card">
  <label for="b64in">Input</label>
  <textarea id="b64in" spellcheck="false" placeholder="Text to encode, or Base64 to decode"></textarea>
  <label class="check"><input type="checkbox" id="urlsafe"> URL-safe (− and _ instead of + and /, no padding)</label>
  <div class="btns"><button id="enc">Encode →</button><button id="dec" class="secondary">← Decode</button><button id="swap" class="secondary">Use output as input</button></div>
  <label for="b64out">Output</label>
  <textarea id="b64out" spellcheck="false" readonly></textarea>
  <div id="bmsg" class="msg" role="status"></div>
  <div class="btns"><button id="bcopy">Copy output</button>
  <label class="btn secondary" for="bfile">File → Base64 data URI</label><input type="file" id="bfile" class="sr"></div>
</div>`,
    howto: [
      'Paste text and click Encode, or paste Base64 and click Decode.',
      'Enable URL-safe mode for tokens, JWT parts and query strings.',
      'Choose a file to turn it into a data URI you can embed in HTML or CSS.'
    ],
    faq: [
      ['What is Base64?', 'Base64 represents binary data using 64 printable characters (A–Z, a–z, 0–9, + and /). It is used to embed images in HTML/CSS, send attachments in email, and pass data in URLs and JSON.'],
      ['Is Base64 encryption?', 'No. Base64 is an encoding, not encryption. Anyone can decode it, so never use it to protect secrets.'],
      ['Does it support emoji and non-English text?', 'Yes. Text is converted to UTF-8 bytes before encoding, so emoji, accents and any script decode back exactly.'],
      ['What is URL-safe Base64?', 'A variant that replaces + with − and / with _ and drops = padding so the output can be used safely in URLs and file names. JWTs use this format.']
    ]
  },
  {
    slug: 'color-contrast-checker',
    emoji: '🎨',
    category: 'Design',
    name: 'Color Contrast Checker',
    title: 'Color Contrast Checker – WCAG AA & AAA Accessibility',
    description: 'Check the contrast ratio between text and background colors against WCAG 2.2 AA and AAA. Live preview and an automatic fix suggestion for failing colors.',
    h1: 'Color Contrast Checker (WCAG)',
    lead: 'Make sure your text is readable for everyone. Test any two colors against WCAG accessibility standards and get a passing alternative.',
    appCategory: 'DesignApplication',
    body: `
<div class="card">
  <div class="row">
    <div><label for="fg">Text color</label><div style="display:flex;gap:8px"><input type="color" id="fgc" value="#7c5cff" aria-label="Pick text color" style="width:52px;height:44px;border:0;background:none"><input id="fg" type="text" value="#7c5cff"></div></div>
    <div><label for="bg">Background color</label><div style="display:flex;gap:8px"><input type="color" id="bgc" value="#ffffff" aria-label="Pick background color" style="width:52px;height:44px;border:0;background:none"><input id="bg" type="text" value="#ffffff"></div></div>
  </div>
  <div id="preview" style="margin-top:16px;border-radius:12px;padding:20px">
    <div style="font-size:1.6rem;font-weight:700">Large heading text</div>
    <div>Normal body text looks like this. The quick brown fox jumps over the lazy dog.</div>
  </div>
  <div class="stats">
    <div class="stat"><b id="ratio">–</b><span>Contrast ratio</span></div>
    <div class="stat"><b id="aan">–</b><span>AA normal text (4.5:1)</span></div>
    <div class="stat"><b id="aal">–</b><span>AA large text (3:1)</span></div>
    <div class="stat"><b id="aaan">–</b><span>AAA normal text (7:1)</span></div>
    <div class="stat"><b id="aaal">–</b><span>AAA large text (4.5:1)</span></div>
  </div>
  <div class="msg" id="suggest"></div>
  <div class="btns"><button id="cswap" class="secondary">Swap colors</button></div>
</div>`,
    howto: [
      'Enter or pick your text color and background color (hex values like #1a2b3c).',
      'Read the contrast ratio and the pass/fail results for each WCAG level.',
      'If a check fails, use the suggested text color that keeps your hue but passes AA.'
    ],
    faq: [
      ['What contrast ratio does WCAG require?', 'WCAG 2.2 level AA requires at least 4.5:1 for normal text and 3:1 for large text. Level AAA requires 7:1 for normal text and 4.5:1 for large text.'],
      ['What counts as large text?', 'Text that is at least 24px (18pt) regular, or at least 18.66px (14pt) bold.'],
      ['How is the contrast ratio calculated?', 'It is (L1 + 0.05) / (L2 + 0.05), where L1 and L2 are the relative luminance of the lighter and darker colors, computed from linearized sRGB values.'],
      ['Why does color contrast matter?', 'Low contrast is one of the most common accessibility failures. Good contrast helps people with low vision, color blindness, and anyone reading on a phone in sunlight.']
    ]
  },
  {
    slug: 'unit-converter',
    emoji: '📏',
    category: 'Everyday',
    name: 'Unit Converter',
    title: 'Unit Converter – Length, Weight, Temperature & More',
    description: 'Convert length, weight, temperature, volume, area, speed, data size and time units instantly. Metric and imperial, two-way, with a full conversion table.',
    h1: 'Unit Converter',
    lead: 'Fast two-way conversions between metric and imperial units, with every related unit shown at once.',
    appCategory: 'UtilitiesApplication',
    body: `
<div class="card">
  <label for="ucat">Category</label>
  <select id="ucat"></select>
  <div class="row">
    <div><label for="uval1">From</label><input id="uval1" type="number" value="1" step="any"><select id="u1" aria-label="From unit" style="margin-top:8px"></select></div>
    <div><label for="uval2">To</label><input id="uval2" type="number" step="any"><select id="u2" aria-label="To unit" style="margin-top:8px"></select></div>
  </div>
  <div class="btns"><button id="uswap" class="secondary">⇄ Swap units</button></div>
  <div class="out" id="uformula"></div>
  <div style="overflow-x:auto"><table><thead><tr><th>Unit</th><th>Value</th></tr></thead><tbody id="uall"></tbody></table></div>
</div>`,
    howto: [
      'Choose a category such as Length or Temperature.',
      'Pick the units to convert from and to, then type a value in either box. Conversion works both ways.',
      'See the same value in every other unit in the table below.'
    ],
    faq: [
      ['How many centimeters are in an inch?', 'Exactly 2.54 centimeters. An inch is defined as 25.4 millimeters.'],
      ['How do I convert Celsius to Fahrenheit?', 'Multiply by 9/5 and add 32. For example, 20 °C × 9/5 + 32 = 68 °F. To go back, subtract 32 and multiply by 5/9.'],
      ['How many pounds are in a kilogram?', 'One kilogram is about 2.20462 pounds. One pound is exactly 0.45359237 kilograms.'],
      ['What is the difference between MB and MiB?', 'A megabyte (MB) is 1,000,000 bytes, while a mebibyte (MiB) is 1,048,576 bytes (2^20). Storage makers use MB/GB; operating systems often show MiB/GiB.']
    ]
  },
  {
    slug: 'age-calculator',
    emoji: '🎂',
    category: 'Everyday',
    name: 'Age Calculator',
    title: 'Age Calculator – Exact Age in Years, Months & Days',
    description: 'Calculate your exact age in years, months and days from your date of birth. See total weeks, days and hours lived, the weekday you were born and your next birthday.',
    h1: 'Age Calculator',
    lead: 'Enter a date of birth to get an exact age, a countdown to the next birthday, and fun totals like days and hours lived.',
    appCategory: 'UtilitiesApplication',
    body: `
<div class="card">
  <div class="row">
    <div><label for="dob">Date of birth</label><input id="dob" type="date" value="1995-06-15"></div>
    <div><label for="asof">Age on this date</label><input id="asof" type="date"></div>
  </div>
  <div class="out" id="agemain" aria-live="polite"></div>
  <div class="stats">
    <div class="stat"><b id="nextbd">–</b><span>Until next birthday</span></div>
    <div class="stat"><b id="bornday">–</b><span>Day of the week born</span></div>
    <div class="stat"><b id="turning">–</b><span>Next birthday age</span></div>
  </div>
  <div style="overflow-x:auto"><table><thead><tr><th>Unit</th><th>Total lived</th></tr></thead><tbody id="agetbl"></tbody></table></div>
</div>`,
    howto: [
      'Pick a date of birth.',
      'Optionally change "Age on this date" to work out age at a past or future date.',
      'Read the exact age, next-birthday countdown and totals in other units.'
    ],
    faq: [
      ['How is exact age calculated?', 'The calculator counts full years first, then full months, then remaining days, the same way age is counted on official documents. Month lengths and leap years are handled automatically.'],
      ['What if I was born on February 29?', 'In non-leap years this calculator treats February 28 as your birthday, for both your age and the countdown. Some countries, such as the UK, legally use March 1 instead, so check local rules for legal deadlines.'],
      ['Can I calculate age at a specific date?', 'Yes. Change the "Age on this date" field to any past or future date, for example to check eligibility on a deadline.'],
      ['Is my birth date stored?', 'No. Everything is calculated in your browser and nothing is sent or saved.']
    ]
  },
  {
    slug: 'bmi-calculator',
    emoji: '⚖️',
    category: 'Health',
    name: 'BMI Calculator',
    title: 'BMI Calculator – Body Mass Index for Adults (kg or lb)',
    description: 'Calculate your Body Mass Index in metric or imperial units. See your WHO weight category, a healthy weight range for your height, and what BMI does not tell you.',
    h1: 'BMI Calculator',
    lead: 'Find your Body Mass Index and the healthy weight range for your height, in kilograms or pounds.',
    appCategory: 'HealthApplication',
    body: `
<div class="card">
  <label for="bunits">Units</label>
  <select id="bunits"><option value="imp">Imperial (ft, in, lb)</option><option value="met">Metric (cm, kg)</option></select>
  <div class="row" id="bimp">
    <div><label for="bft">Height (feet)</label><input id="bft" type="number" min="0" value="5"></div>
    <div><label for="bin">Height (inches)</label><input id="bin" type="number" min="0" step="0.5" value="9"></div>
    <div><label for="blb">Weight (lb)</label><input id="blb" type="number" min="0" step="0.1" value="165"></div>
  </div>
  <div class="row" id="bmet" hidden>
    <div><label for="bcm">Height (cm)</label><input id="bcm" type="number" min="0" value="175"></div>
    <div><label for="bkg">Weight (kg)</label><input id="bkg" type="number" min="0" step="0.1" value="75"></div>
  </div>
  <div class="stats">
    <div class="stat"><b id="bmi">–</b><span>Your BMI</span></div>
    <div class="stat"><b id="bcat">–</b><span>WHO category</span></div>
    <div class="stat"><b id="brange">–</b><span>Healthy weight for your height</span></div>
  </div>
  <div style="overflow-x:auto"><table><thead><tr><th>Category</th><th>BMI range</th><th>Weight range for you</th></tr></thead><tbody id="btbl"></tbody></table></div>
</div>`,
    howto: [
      'Choose imperial or metric units.',
      'Enter your height and weight. Results update as you type.',
      'Compare your BMI with the WHO categories and the weight range for your height.'
    ],
    faq: [
      ['How is BMI calculated?', 'BMI is your weight in kilograms divided by your height in meters squared (kg/m²). In imperial units it is 703 × pounds ÷ inches².'],
      ['What is a healthy BMI?', 'For adults, the World Health Organization classifies 18.5–24.9 as healthy weight, 25–29.9 as overweight and 30 or more as obesity. Below 18.5 is underweight.'],
      ['Is BMI accurate for everyone?', 'No. BMI does not distinguish muscle from fat, so athletes may score high, and it can underestimate risk in older adults. Some guidelines use lower thresholds for people of Asian descent. It is a screening tool, not a diagnosis.'],
      ['Does this work for children?', 'No. Children and teens need age- and sex-specific BMI percentiles. Talk to a pediatrician for those.']
    ]
  },
  {
    slug: 'csv-json-converter',
    emoji: '🔄',
    category: 'Developer',
    name: 'CSV ↔ JSON Converter',
    title: 'CSV to JSON Converter (and JSON to CSV) – Free & Private',
    description: 'Convert CSV to JSON and JSON to CSV in your browser. Handles quoted fields, commas, newlines, semicolon and tab delimiters, and nested values. Nothing is uploaded.',
    h1: 'CSV ↔ JSON Converter',
    lead: 'Turn spreadsheets into JSON for your code, or JSON arrays back into CSV for Excel and Google Sheets.',
    appCategory: 'DeveloperApplication',
    body: `
<div class="card">
  <label for="cjin">Input (CSV or JSON)</label>
  <textarea id="cjin" spellcheck="false">name,city,score
"Smith, Jane",Berlin,92
Ali,"New
York",88</textarea>
  <div class="row">
    <div><label for="cjdelim">CSV delimiter</label><select id="cjdelim"><option value="auto">Auto-detect</option><option value=",">Comma ,</option><option value=";">Semicolon ;</option><option value="\t">Tab</option></select></div>
    <div><label class="check" style="margin-top:34px"><input type="checkbox" id="cjtypes" checked> Convert numbers &amp; true/false</label></div>
  </div>
  <div class="btns"><button id="tojson">CSV → JSON</button><button id="tocsv" class="secondary">JSON → CSV</button><button id="cjcopy" class="secondary">Copy output</button><button id="cjdl" class="secondary">Download</button></div>
  <div id="cjmsg" class="msg" role="status"></div>
  <label for="cjout">Output</label>
  <textarea id="cjout" spellcheck="false" readonly></textarea>
</div>`,
    howto: [
      'Paste CSV with a header row, or a JSON array of objects.',
      'Click CSV → JSON or JSON → CSV.',
      'Copy the result or download it as a .json or .csv file.'
    ],
    faq: [
      ['Does it handle commas and line breaks inside fields?', 'Yes. It follows the RFC 4180 CSV standard: fields wrapped in double quotes can contain commas, line breaks and escaped quotes ("").'],
      ['What JSON format does it produce?', 'An array of objects, one per row, using the header row as keys. Numbers and true/false are converted to real JSON types unless you turn that off.'],
      ['How are nested JSON values converted to CSV?', 'Columns are the union of all keys across objects. Nested objects and arrays are written as JSON text inside the cell so no data is lost.'],
      ['Is my data uploaded?', 'No. Conversion happens entirely in your browser, which makes it safe for customer lists and other private data.']
    ]
  },
  {
    slug: 'uuid-generator',
    emoji: '🆔',
    category: 'Developer',
    name: 'UUID Generator',
    title: 'UUID Generator – Random v4 & Time-Ordered v7 UUIDs',
    description: 'Generate random UUID v4 or time-sortable UUID v7 identifiers using secure randomness. Uppercase, no-hyphen and bulk options. Validate and inspect any UUID too.',
    h1: 'UUID / GUID Generator',
    lead: 'Create universally unique identifiers for databases, APIs and tests, with crypto-secure randomness.',
    appCategory: 'DeveloperApplication',
    body: `
<div class="card">
  <div class="row">
    <div><label for="uver">Version</label><select id="uver"><option value="4">v4 (random)</option><option value="7">v7 (time-ordered)</option></select></div>
    <div><label for="ucount">How many</label><input id="ucount" type="number" min="1" max="1000" value="5"></div>
    <div><label class="check" style="margin-top:34px"><input type="checkbox" id="uupper"> UPPERCASE</label><label class="check"><input type="checkbox" id="unohyph"> No hyphens</label></div>
  </div>
  <div class="btns"><button id="ugen">Generate</button><button id="ucopy" class="secondary">Copy all</button><button id="udl" class="secondary">Download .txt</button></div>
  <div id="umsg" class="msg"></div>
  <textarea id="uout" spellcheck="false" readonly style="min-height:160px"></textarea>
  <h3 style="margin-top:22px">Validate / inspect a UUID</h3>
  <input id="uchk" type="text" placeholder="Paste a UUID…">
  <div id="uchkres" class="msg"></div>
</div>`,
    howto: [
      'Choose v4 for fully random IDs or v7 for IDs that sort by creation time.',
      'Pick how many you need and any formatting options, then click Generate.',
      'Paste any UUID into the validator to see its version and variant (and timestamp for v7).'
    ],
    faq: [
      ['What is the difference between UUID v4 and v7?', 'v4 is 122 bits of randomness. v7 (RFC 9562) starts with a millisecond Unix timestamp followed by random bits, so IDs sort in creation order. That makes database indexes much more efficient.'],
      ['Can two UUIDs ever collide?', 'In practice, no. With v4 you would need to generate about 2.7 quintillion IDs to have a 50% chance of a single collision.'],
      ['Is a GUID the same as a UUID?', 'Yes. GUID is Microsoft\'s name for the same 128-bit identifier format.'],
      ['How many can I generate?', 'Up to 10 at a time for free. Tooldeck Pro lets you generate up to 1,000 at once.']
    ]
  }
];
