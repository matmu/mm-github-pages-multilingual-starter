const fs = require("fs");

const file = "_site/assets/js/main.min.js";

const needleVars =
  'c=$("nav.greedy-nav .site-title"),d=$("nav.greedy-nav button.search__toggle");';

const replacementVars =
  'c=$("nav.greedy-nav .site-title"),d=$("nav.greedy-nav button.search__toggle"),langControl=$("nav.greedy-nav .lang-mini-dd");';

const needleWidth =
  'p=s.innerWidth()-(0!==l.length?l.outerWidth(!0):0)-c.outerWidth(!0)-(0!==d.length?d.outerWidth(!0):0)-(h!==o.length?t.outerWidth(!0):0)';

const replacementWidth =
  'p=s.innerWidth()-(0!==l.length?l.outerWidth(!0):0)-c.outerWidth(!0)-(0!==d.length?d.outerWidth(!0):0)-(0!==langControl.length?langControl.outerWidth(!0):0)-(h!==o.length?t.outerWidth(!0):0)';

if (!fs.existsSync(file)) {
  console.error(`${file}: not found`);
  process.exit(1);
}

let js = fs.readFileSync(file, "utf8");

if (js.includes("lang-mini-dd")) {
  console.log(`${file}: already patched`);
  process.exit(0);
}

if (!js.includes(needleVars)) {
  console.error(`${file}: GreedyNav variable block not found`);
  process.exit(1);
}

if (!js.includes(needleWidth)) {
  console.error(`${file}: GreedyNav width calculation not found`);
  process.exit(1);
}

js = js.replace(needleVars, replacementVars);
js = js.replace(needleWidth, replacementWidth);

fs.writeFileSync(file, js);

console.log(`${file}: patched`);
