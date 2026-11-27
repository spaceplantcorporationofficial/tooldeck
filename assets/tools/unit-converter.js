(() => {
  const { $ } = TD;
  // Factors convert each unit to the category's base unit. Temperature uses functions.
  const U = {
    Length: { base: 'm', units: { Millimeter: 0.001, Centimeter: 0.01, Meter: 1, Kilometer: 1000, Inch: 0.0254, Foot: 0.3048, Yard: 0.9144, Mile: 1609.344, 'Nautical mile': 1852 } },
    Weight: { units: { Milligram: 1e-6, Gram: 0.001, Kilogram: 1, 'Metric ton': 1000, Ounce: 0.028349523125, Pound: 0.45359237, Stone: 6.35029318, 'US ton': 907.18474 } },
    Temperature: { units: {
      Celsius: [(c) => c, (c) => c], Fahrenheit: [(f) => ((f - 32) * 5) / 9, (c) => (c * 9) / 5 + 32], Kelvin: [(k) => k - 273.15, (c) => c + 273.15]
    } },
    Volume: { units: { Milliliter: 0.001, Liter: 1, 'Cubic meter': 1000, Teaspoon: 0.00492892159375, Tablespoon: 0.01478676478125, 'Fluid ounce (US)': 0.0295735295625, 'Cup (US)': 0.2365882365, 'Pint (US)': 0.473176473, 'Quart (US)': 0.946352946, 'Gallon (US)': 3.785411784, 'Gallon (UK)': 4.54609 } },
    Area: { units: { 'Square meter': 1, 'Square kilometer': 1e6, 'Square foot': 0.09290304, 'Square yard': 0.83612736, Acre: 4046.8564224, Hectare: 10000, 'Square mile': 2589988.110336 } },
    Speed: { units: { 'Meters/second': 1, 'Kilometers/hour': 1 / 3.6, 'Miles/hour': 0.44704, Knot: 1852 / 3600, 'Feet/second': 0.3048 } },
    'Data size': { units: { Byte: 1, Kilobyte: 1e3, Megabyte: 1e6, Gigabyte: 1e9, Terabyte: 1e12, Kibibyte: 1024, Mebibyte: 1048576, Gibibyte: 1073741824, Bit: 0.125 } },
    Time: { units: { Second: 1, Minute: 60, Hour: 3600, Day: 86400, Week: 604800, 'Month (avg)': 2629746, 'Year (avg)': 31556952 } }
  };
  const DEFAULTS = { Length: ['Inch', 'Centimeter'], Weight: ['Pound', 'Kilogram'], Temperature: ['Fahrenheit', 'Celsius'], Volume: ['Cup (US)', 'Milliliter'], Area: ['Acre', 'Square meter'], Speed: ['Miles/hour', 'Kilometers/hour'], 'Data size': ['Gigabyte', 'Gibibyte'], Time: ['Day', 'Hour'] };
  const cat = $('#ucat'), u1 = $('#u1'), u2 = $('#u2'), v1 = $('#uval1'), v2 = $('#uval2');

  const fmt = (x) => {
    if (!Number.isFinite(x)) return '';
    const a = Math.abs(x);
    return a !== 0 && (a < 1e-6 || a >= 1e15) ? x.toExponential(6) : String(+x.toPrecision(10));
  };
  const toBase = (c, unit, x) => (c === 'Temperature' ? U[c].units[unit][0](x) : x * U[c].units[unit]);
  const fromBase = (c, unit, x) => (c === 'Temperature' ? U[c].units[unit][1](x) : x / U[c].units[unit]);
  const convert = (c, a, b, x) => fromBase(c, b, toBase(c, a, x));

  function fillUnits() {
    const c = cat.value, opts = Object.keys(U[c].units).map((u) => `<option>${u}</option>`).join('');
    u1.innerHTML = opts; u2.innerHTML = opts;
    [u1.value, u2.value] = DEFAULTS[c];
  }

  function update(from) {
    const c = cat.value;
    if (from === 2) { const x = parseFloat(v2.value); v1.value = isNaN(x) ? '' : fmt(convert(c, u2.value, u1.value, x)); }
    else { const x = parseFloat(v1.value); v2.value = isNaN(x) ? '' : fmt(convert(c, u1.value, u2.value, x)); }
    const x = parseFloat(v1.value);
    if (isNaN(x)) { $('#uformula').textContent = 'Enter a number'; $('#uall').innerHTML = ''; return; }
    $('#uformula').textContent = `${fmt(x)} ${u1.value} = ${fmt(convert(c, u1.value, u2.value, x))} ${u2.value}`;
    $('#uall').innerHTML = Object.keys(U[c].units).map((u) => `<tr><td>${u}</td><td>${fmt(convert(c, u1.value, u, x))}</td></tr>`).join('');
    history.replaceState(null, '', `#${encodeURIComponent(c)}|${encodeURIComponent(u1.value)}|${encodeURIComponent(u2.value)}|${v1.value}`);
  }

  cat.innerHTML = Object.keys(U).map((c) => `<option>${c}</option>`).join('');
  cat.value = 'Length';
  const h = location.hash.slice(1).split('|').map(decodeURIComponent);
  if (U[h[0]]) { cat.value = h[0]; fillUnits(); if (U[h[0]].units[h[1]]) u1.value = h[1]; if (U[h[0]].units[h[2]]) u2.value = h[2]; if (h[3]) v1.value = h[3]; }
  else fillUnits();

  cat.onchange = () => { fillUnits(); update(1); };
  u1.onchange = () => update(1); u2.onchange = () => update(1);
  v1.oninput = () => update(1); v2.oninput = () => update(2);
  $('#uswap').onclick = () => { [u1.value, u2.value] = [u2.value, u1.value]; update(1); };
  update(1);
  window.__ucv = convert; // exposed for tests
})();
