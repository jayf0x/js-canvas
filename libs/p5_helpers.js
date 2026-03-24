const { log, warn, info } = console;
let _pause = false;
let ctx, cnv;
let exit = false;
let enableCustomEvents = true;

const PI = Math.PI;
const PI2 = Math.PI * 2;

// function hsl(v=0, s = 50, l = 50, a = 1, obj=false) {
//     return obj ? {v:v, s:s, l:l, a:a} : `hsl(${v},${s}%, ${l}%, ${a})`
// }

async function sleeping(s = 0.1) {
  _pause = true;
  await sleep(s);
  _pause = false;
}

window.addEventListener("keydown", (ev) => {
  if (enableCustomEvents && ev.key === " ") {
    _pause = !_pause;
    if (_pause) noLoop();
    else loop();
  }
});


function toFixed(n, s = 3) {
  return +n.toFixed(s);
}
function randbool() {
  return [true, false][randint()];
}

function mapsHave(a, b) {
  for (const [key, value] of Object.entries(a)) {
    if (b.has(key)) return b.get(key);
  }
  return false;
}

function glob(s) {
  return str(s).replace(/(\/)/g, "_");
}

Array.prototype.remove = function (n) {
  const idx = this.indexOf(n);
  if (idx > -1) this.splice(idx, 1);
};

Array.prototype.chunk = function (size = 2) {
  const res = [];
  for (let i = 0; i < this.length; i += size) {
    const chunk = this.slice(i, i + size);
    res.push(chunk);
  }
  return res;
};


JSON.copy = function copy(n) {
  return JSON.parse(JSON.stringify(n));
};

function coords(x, y) {
  if (typeof x === "object") {
    y = x.y;
    x = x.x;
  }
  return `${x};${y}`;
}

// function overCount(i, max) {
//   while (i > max) {
//     i -= max;
//   }
//   return i;
// }

function vectorFromCoords(angle, dis) {
  return {
    x: dis * cos(angle),
    y: dis * sin(angle),
  };
}

function inRange(a, b, rang = 10, neg = true, try2) {
  for (let i = neg ? -rang : 0; i <= rang; i += 1) {
    if (floor(a + i) === floor(b)) {
      return true;
    }
  }

  return false;
}

function objInRange(a, b, r) {
  const disX = inRange(a.x, b.x, r, true);
  const disY = inRange(a.y, b.y, r, true);
  if (disX != false && disY != false) return true;
  return false;
}

function getAreaBySides(a, b, c) {
  return (
    0.25 * Math.sqrt((a + b + c) * (-a + b + c) * (a - b + c) * (a + b - c))
  );
}

const {
  pow,
  sqrt,
  atan2,
  cos,
  sin,
  tan,
  cosh,
  sinh,
  tanh,
  atan,
  round,
  ceil,
  abs,
  floor, hypot 
} = Math;

const degRad = (i) => i * (PI / 180);
const radDeg = function (i, add = false) {
  const res = i * (180 / PI);
  return res + (add && res < 0 ? 360 : 0);
};

let max = Infinity;
let min = -Infinity;

const hexTable = Object.freeze({
  f: 15,
  e: 14,
  d: 13,
  c: 12,
  b: 11,
  a: 10,
  9: 9,
  8: 8,
  7: 7,
  6: 6,
  5: 5,
  4: 4,
  3: 3,
  2: 2,
  1: 1,
  0: 0,
  15: "f",
  14: "e",
  13: "d",
  12: "c",
  11: "b",
  10: "a",
  9: "9",
  8: "8",
  7: "7",
  6: "6",
  5: "5",
  4: "4",
  3: "3",
  2: "2",
  1: "1",
  0: "0",
});

const alphabet = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
numericals = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

const COLORS = [
  "#FF6633",
  "#FFB399",
  "#FF33FF",
  "#FFFF99",
  "#00B3E6",
  "#E6B333",
  "#3366E6",
  "#999966",
  "#99FF99",
  "#B34D4D",
  "#80B300",
  "#809900",
  "#E6B3B3",
  "#6680B3",
  "#66991A",
  "#FF99E6",
  "#CCFF1A",
  "#FF1A66",
  "#E6331A",
  "#33FFCC",
  "#66994D",
  "#B366CC",
  "#4D8000",
  "#B33300",
  "#CC80CC",
  "#66664D",
  "#991AFF",
  "#E666FF",
  "#4DB3FF",
  "#1AB399",
  "#E666B3",
  "#33991A",
  "#CC9999",
  "#B3B31A",
  "#00E680",
  "#4D8066",
  "#809980",
  "#E6FF80",
  "#1AFF33",
  "#999933",
  "#FF3380",
  "#CCCC00",
  "#66E64D",
  "#4D80CC",
  "#9900B3",
  "#E64D66",
  "#4DB380",
  "#FF4D4D",
  "#99E6E6",
  "#6666FF",
];

/**
 * -----------------------------
 * CANVAS SETUP
 * -----------------------------
 * Some functions are from stack overflow, but you will see the difference
 * Some functions are made for a single script, so might have wierd names or purpose
 * */

/**
 * -----------------------------
 * Functions, helpers, prototype
 * -----------------------------
 */

// Object.prototype.add = function(key, amount) {
//     this[key] += amount;
//     log(key)
// };

Object.is = function (n) {
  return !!(!Array.isArray(n) && typeof n === "object" && n !== null);
};

Object.copy = function (original) {
  return Object.assign(
    Object.create(Object.getPrototypeOf(original)),
    original
  );
};

function copy(n) {
  return JSON.parse(JSON.stringify(n));
}

Object.size = function (obj) {
  let size = 0;
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};

Object.prototype.size = function () {
  let size = 0;
  for (let key in obj) {
    if (this.hasOwnProperty(key)) size++;
  }
  return size;
};

Object.prototype.clear = function () {
  for (const prop of Object.getOwnPropertyNames(this)) {
    delete this[prop];
  }
};

Object.prototype.inherit = function (
  target,
  onlyavailable = false,
  { deep = false } = {}
) {
  // fix, func name check
  if (deep) {
    for (let [key, val] of Object.entries(target)) {
      if (Object.is(val)) {
        for (let [k, v] of Object.entries(val)) {
          if (!onlyavailable || (onlyavailable && this[key] !== undefined)) {
            this[key][k] = v;
          }
        }
      } else {
        if (!onlyavailable || (onlyavailable && this[key] !== undefined)) {
          this[key] = val;
        }
      }
    }
  } else
    for (let [key, val] of Object.entries(target)) {
      if (!onlyavailable || (onlyavailable && this[key] !== undefined)) {
        this[key] = val;
      }
    }
};

Array.prototype.current = 0;
Array.prototype.next = function () {
  if (this.current > this.length) this.current = -1;
  return this[this.current++];
};

Array.prototype.prev = function () {
  return this[this.current--];
};

Array.prototype.shiftLeft = function (amt = 1) {
  if (amt < 0) throw new Error("Amount cant be negative values");
  for (let _ in range(amt)) this.unshift(this.pop());
};

Array.prototype.shiftRight = function (amt = 1) {
  if (amt < 0) throw new Error("Amount cant be negative values");
  for (let _ in range(amt)) this.push(this.shift());
};

Array.prototype.remove = function (n) {
  const idx = this.indexOf(n);
  if (idx > -1) this.splice(idx, 1);
  else throw new Error(str(n) + "is not an element in" + str(this));
};

Array.prototype.scaleBetween = function (scaledMin, scaledMax) {
  var max = Math.max.apply(Math, this);
  var min = Math.min.apply(Math, this);
  return this.map(
    (num) => ((scaledMax - scaledMin) * (num - min)) / (max - min) + scaledMin
  );
};

Array.prototype.random = function () {
  return this[randint(this.length - 1)];
};

Array.prototype.sum = function () {
  return this.reduce((t, i) => t + i, 0);
};

Array.prototype.average = function () {
  return this.sum() / this.length;
};

Array.prototype.randomRange = function (amount = 1, asString = false) {
  const res = [];
  for (let n of range(amount)) {
    res.push(this[randint(this.length - 1)]);
  }
  if (asString) return res.join("");
  return res;
};

Array.prototype.cleanOut = function () {
  return this.filter((i) => i);
};

Array.prototype.circumcise = function (size, padding = 0) {
  const res = this.slice(0, size);
  while (res.length < size) {
    res.push(padding);
  }
  return res;
};

Array.prototype.chunk = function (chunkSize = int) {
  const res = [];
  for (let i = 0; i < this.length; i += chunkSize) {
    const chunk = this.slice(i, i + chunkSize);
    res.push(chunk);
  }
  return res;
};

// changed: (idxOnly, idx = 1)=> ( idx = 1, idxOnly)
Array.prototype.last = function (idx = 1, idxOnly) {
  return idxOnly ? this.length - idx : this[this.length - idx];
};

Array.prototype.sortAc = function (paramA, paramB, bDc, aDc) {
  if (paramB) {
    return this.sort((a, b) =>
      aDc
        ? b[paramA] - a[paramA]
        : a[paramA] - b[paramA] || bDc
        ? b[paramB] - a[paramB]
        : a[paramB] - b[paramB]
    );
  } else if (paramA) {
    return this.sort((a, b) => {
      return a[paramA] - b[paramA];
    });
  }
  return this.sort((a, b) => {
    return a - b;
  });
};

Array.prototype.sortDc = function (paramA, paramB, bAc, aAc) {
  if (paramB) {
    return this.sort((a, b) =>
      aAc
        ? a[paramA] - b[paramA]
        : b[paramA] - a[paramA] || bAc
        ? a[paramB] - b[paramB]
        : b[paramB] - a[paramB]
    );
  } else if (paramA) {
    return this.sort((a, b) => {
      return b[paramA] - a[paramA];
    });
  }
  return this.sort((a, b) => {
    return b - a;
  });
};

Boolean.prototype.toggle = function () {
  return !this.valueOf();
};

String.prototype.hexEncode = function () {
  let res = "";
  for (let i = 0; i < this.length; i++) {
    const hex = this.charCodeAt(i).toString(16);
    res += ("000" + hex).slice(-4);
  }
  return res;
};

String.prototype.hexDecode = function () {
  const hexes = this.match(/.{1,4}/g) || [];
  let res = "";
  for (let j = 0; j < hexes.length; j++) {
    res += String.fromCharCode(parseInt(hexes[j], 16));
  }

  return res;
};



// String.prototype.toBin8 = function() {
//     return this
//       .match(/.{1,8}/g)
//       .join(' ')
//       .split(' ')
//       .reduce((a, c) => a += String.fromCharCode(parseInt(c, 2)), '');
// }

window.isFocussed = () => document.visibilityState === "visible";

function loadFile(href = "./main.css", type = "style/css", rel = "stylesheet") {
  const link = document.createElement("link");
  link.rel = rel;
  link.type = type;
  link.href = href;
  log(link);
  document.getElementsByTagName("HEAD")[0].appendChild(link);
}
// load css files
//loadFile(href = '/Users/home/Documents/Code/Canvas_stuff/main.css', type='style/css', rel='stylesheet')

function scaleNum(
  val,
  srcMin,
  srcMax,
  targMin = 0,
  targMax = 1,
  method1 = false
) {
  if (method1)
    return ((val - targMin) / (targMax - targMin)) * (srcMax - srcMin) + srcMin;
  const targetRange = targMax - targMin;
  const sourceRange = srcMax - srcMin;
  return ((val - srcMin) * targetRange) / sourceRange + targMin;
}

// const scaleNum = (inputY, xMin, xMax, yMin=0, yMax=1) => {
//     return ((inputY - yMin) / (yMax - yMin)) * (xMax - xMin) + xMin;
// };

function parseColor(arr) {
  let res = arr.map(hex).join("");
  if (res === "000000") res = "ffffff";
  return "#" + res;
}

function overCount(i, max, min = 0, nullable = true) {
  while (i >= max) {
    if (nullable && i == 0) return i;
    i -= max;
  }
  while (i < min) {
    if (nullable && i == 0) return i;
    i += posInt(min || 1);
  }
  return i;
}

function arrayChuck(arr, chunkSize) {
  const res = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    res.push(chunk);
  }
  return res;
}

function strChuck(str, chunkSize = 2) {
  const re = new RegExp(`.{1,${chunkSize}}`, "g");
  return str.match(re);
}

function pythagoras({ a, b, c, hb, hc } = {}) {
  if (hb) {
    hb = degRad(hb);
    c = a / cos(hb);
  }
  if (hc) {
    hc = degRad(hc);
    a = c * sin(hc);
  }

  if (!c) {
    c = Math.sqrt(a ** 2 + b ** 2);
  } else if (!b) {
    b = Math.sqrt(c ** 2 - a ** 2);
  } else if (!a) {
    a = Math.sqrt(c ** 2 - b ** 2);
  }
  return { a: a, b: b, c: c, hb: hb, hc: hc };
}

function rotateVector(x, y, angle, rad = 1, isDeg = false) {
  let _x = degRad(x);
  let _y = degRad(y);
  // ? numbers that make is somehow even rotations
  const ang = isDeg ? degRad(-angle - 50.5) : -angle - 50.5;

  const cs = cos(ang) * rad;
  const sn = sin(ang) * rad;
  return {
    x: toFixed(_x * cs - _y * sn),
    y: toFixed(_x * sn + _y * cs),
    angle: angle,
  };
}

function numMax(n, max) {
  return n > max ? max : n;
}

function range(n = 1, detail = 1) {
  // return new Array(n)
  let res = [];
  for (let i = n < 0 ? n : 0; i < n; i += detail) {
    res.push(+i);
  }
  return res;
}

function range0(n = 1) {
  //[...new Array(floor(window.innerWidth/pxScale))].map((i, idx)=>idx)
  // return new Array(n)
  let res = [];
  for (let i = n < 0 ? n : 0; i < n; i += 1) {
    res.push(0);
  }
  return res;
}

function rangeF(f = () => "", n = 1) {
  let res = [];
  for (let i = n < 0 ? n : 0; i < n; i += 1) {
    res.push(f(i));
  }
  return res;
}

function rangeSign(n = 1, sign) {
  // return new Array(n)
  let res = [];
  for (let i = n < 0 ? n : 0; i < n; i += 1) {
    res.push(sign);
  }
  return res.join("");
}

function sleep(s = 0.1) {
  return new Promise((resolve) => setTimeout(resolve, s * 1000));
}

async function pauseHalt(sl, overlay = true) {
  if (sl) {
    await sleep(sl);
  }
  if (_pause) {
    if (overlay) overlayDIV.set("=", "overlay-_pause", "overlay-fixed");
    //else textCenter("||", 200, "white")
    let timeout = 0;
    while (_pause) {
      await sleep();
      timeout++;
      if (timeout > 2000) {
        _pause = false;
        if (overlay) {
          overlayDIV.remove();
          overlayDIV.set("TIME-OUT, press r", "overlay-fixed", "red");
          Events.setKey("r", () => window.location.reload());
          exitting("sleep timeout");
        }
      }
    }
    if (overlay) overlayDIV.remove();
  }
  return;
}

function exitting(msg = "--exit--", force = false) {
  exit = true;
  if (force) body.innerHTML = "";
  throw new Error(msg);
}

function repeatF(f = () => {}, times = 10) {
  for (let i = 0; i < times; i += 1) {
    f((i = i));
  }
}

function repeatS(s = "", times = 1) {
  let r = s;
  for (let i = 1; i < times; i += 1) {
    r += s;
  }
  return r;
}

function ctxError(s) {
  clear();
  textCenter(s);
  throw new Error(s);
}

function isObj(n) {
  return n instanceof Object;
}

function isArray(n) {
  return n instanceof Array;
}

function isString(n) {
  return typeof n === "string"; //n instanceof String
}

function isInt(n) {
  return n instanceof Number;
}

function str(a) {
  return String(a);
}

function int(a) {
  return +a;
}

function posInt(a) {
  return a < 0 ? a * -1 : a;
}

function negInt(a) {
  return a > 0 ? a * -1 : a;
}

function isNeg(a) {
  return a < 0;
}

function isPos(a) {
  return a > 0;
}

function oppInt(a) {
  return a > 0 ? -1 : 1;
}

function hex(
  int,
  strLen = 1,
  formatted = false,
  { bit6 = false, transparency = 1 } = {}
) {
  // ff=255, fff=4095
  let hex = int.toString(16);
  while (hex.length < strLen) {
    hex = "0" + hex;
  }
  if (bit6 || transparency) {
    // fff => ffffff
    if (hex.length === 3)
      hex = hex
        .split("")
        .map((i, idx) => i + i)
        .join("");
    // fff/ffffff => ffffff22
    if (transparency) hex += (transparency * 255).toString(16);
  }
  return formatted ? "#" + hex : hex;
}

function hexTo(hex, raw = false) {
  const mix = [];
  for (let i of hex) {
    let n = +i;
    if (isNaN(n)) {
      n = hexTable[i];
    }
    mix.push(n);
  }
  return mix.filter((i) => i).reduce((i, j) => i * j);
}

function addHex(a, b) {
  let hexStr = (parseInt(a, 16) + parseInt(b, 16)).toString(16);
  while (hexStr.length < 6) {
    hexStr = "0" + hexStr;
  }
  return hexStr;
}

function hexToRgb(hex, array = false, { formatted = false, h = 1 } = {}) {
  const mix = [];
  const res = {};
  const cols = ["r", "g", "b", "h"];
  let inc = hex.length === 3 ? 1 : 2;
  for (let i = 0; i < hex.length; i += inc) {
    let n = +hex[i];
    if (isNaN(n)) {
      n = hexTable[hex[i]];
    }
    mix.push((256 / 15) * n);
  }
  if (array) return mix;
  for (let i of range(3)) {
    if (mix[i]) res[cols[i]] = mix[i];
  }
  if (formatted) return `rgba(${res.r}, ${res.g}, ${res.b}, ${h})`;
  return res;
}

function hsl(v, s = 50, l = 50, a = 1, obj = false) {
  return obj ? { v: v, s: s, l: l, a: a } : `hsl(${v},${s}%, ${l}%, ${a})`;
}

function hslTo(h, s = 0, l = 0, hex = false, raw = true) {
  if (typeof h === "string") {
    [h, s, l] = h
      .match(/\d*/g)
      .filter((i) => i)
      .map((i) => (+i < 0 ? (i *= -1) : +i));
  }
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return hex
      ? Math.round(255 * color)
          .toString(16)
          .padStart(2, "0")
      : Math.round(color * 255); // convert to Hex and prefix "0" if needed
  };
  return raw && !hex ? [f(0), f(8), f(4)] : "#" + f(0) + f(8) + f(4);
}

function mapNum(inp, minInput, maxInput, minOutput, maxOutput) {
  return (
    ((inp - minInput) * (maxOutput - minOutput)) / (maxInput - minInput) +
    minOutput
  );
}

function roundTo(a, nr = 1) {
  return round(Math.ceil(a / nr) * nr);
}

function shuffleArray(arr) {
  /** dustinfield algorithm */
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}

function objAdd(a, b) {
  for (const [key, val] of Object.entries(a)) {
    a[key] += b[key];
  }
}

function forEachObj(obj, opr) {
  for (const [key, val] of Object.entries(obj)) {
    opr(key, val, obj);
  }
}
function randstr(length = 1) {
  return alphabet.randomRange(length).join("");
}

function randint(a = 1, b = 0, rounded = true) {
  const n = b
    ? Math.random() * (b - a + 1) + a
    : Math.random() * (a - b + 1) + b;
  return rounded ? floor(n) : n;
}

function randfloat(a = 1, b = 0, fixed = 3) {
  return toFixed(
    b ? Math.random() * (b - a + 1) + a : Math.random() * (a - b + 1) + b,
    fixed
  );
  // return toFixed(b ? a + Math.random() * (b * 2) : Math.random() * a, fixed)
}


function timer(func, iterations = 10, time = 1000) {
  const n = str(new Date().getTime());
  for (let i = 0; i < iterations; i += 1) {
    console.time(n);
    for (let j = 0; j < time; j += 1) {
      func(j, i);
    }
    console.timeEnd(n);
  }
  log(" __________ iterations", iterations, "time:", time);
}

function sCoord(x, y) {
  return `${x};${y}`;
}

function getNieghboursByDimension(dim = 1, x, y, scale = 1) {
  const res = [];
  for (let col = -dim; col <= dim; col++) {
    for (let row = -dim; row <= dim; row++) {
      if (!(col == 0 && row == 0)) {
        if (!x && !y) {
          res.push([col, row]);
        } else {
          res.push([x + col * scale, y + row * scale]);
        }
      }
    }
  }
  return res;
}

function posByAngle(x, y, angle, dis, inradians) {
  if (inradians) angle = degRad(angle);
  const _x = dis * cos(angle);
  const _y = dis * sin(angle);
  return {
    x: x === null ? _x : x + _x,
    y: y === null ? _y : y + _y,
  };
}

function posTowards(src, targ, dis = 1) {
  let phi, lambda;
  const dx = targ.x - src.x;
  const dy = targ.y - src.y;
  const dz = targ.z || 0 - src.z || 0;
  let angle = atan2(dy, dx);

  if (targ.z && src.z) {
    let rxy = sqrt(pow(dx, 2) + pow(dy, 2));
    lambda = atan(dy / dx);
    phi = atan(dz / rxy);
    if (dx < 0) phi += PI;
    if (dz < 0) lambda *= -1;
    angle = lambda;
  }

  return {
    x: dis * cos(angle),
    y: dis * sin(angle),
    z: dis * phi,
    a: angle,
  };
}

function closeTo(a, b, r) {
  const disX = inRange(a.x, b.x, r, true);
  const disY = inRange(a.y, b.y, r, true);
  if (disX != false && disY != false)
    return {
      x: disX,
      y: disY,
    };
  return false;
}

function closeToZ(a, b, r) {
  const disX = inRange(a.projX, b.projX, r, true);
  const disY = inRange(a.projY, b.projY, r, true);
  const disZ = a.z ? inRange(a.z, b.z, r, true) : true;
  if (disX != false && disY != false)
    return {
      x: disX,
      y: disY,
      z: disZ,
    };
  return false;
}

function distanceTo(src, targ, signel = true) {
  if (signel) return toFixed(Math.hypot(targ.x - src.x, targ.y - src.y), 3);
  const dx = targ.x - src.x;
  const dy = targ.y - src.y;
  return {
    x: dx,
    y: dy,
  };
}

function distanceToZ(src, targ) {
  return (
    ((targ.x - src.x) ** 2 + (targ.y - src.y) ** 2 + (targ.z - src.z) ** 2) **
    (1 / 2)
  );
}

function isPointInShape(p, shape) {
  const x = p.x;
  const y = p.y;

  let inside = false;
  for (let i = 0, j = shape.length - 1; i < shape.length; j = i++) {
    const xi = shape[i].x,
      yi = shape[i].y;
    const xj = shape[j].x,
      yj = shape[j].y;

    const intersect =
      (xi === x && yi === y) ||
      (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }

  return inside;
}

/**
 * -----------------------------
 * Classes, Objects & libs
 * -----------------------------
 */

const incrementer = {
  i: 0,
  amount: 1,
  limit: 10,
  origValues: {},
  callback: "",
  init(callback = () => "", limit, i, amount, name) {
    // const name = name || str(randint(1000))
    this.callback = callback;
    this.limit = limit || this.limit;
    this.i = i || this.i;
    this.amount = amount || this.amount;
    this.origValues = Object.copy(this);
    return this;
  },
  inc() {
    if (this.i >= this.limit) return this.callback();
    this.i += this.amount;
  },
  reset() {
    for (let prop in this.origValues) {
      this[prop] = this.origValues[prop];
    }
  },
};

const Controls = {
  div: Element,
  input: Element,
  label: Element,
  centerElm: document.querySelector("#controls"),
  create(lable, type = "checkbox", add = false) {
    this.div = document.createElement("div");
    this.input = document.createElement("input");
    this.label = document.createElement("label");

    this.input.type = type;
    this.label.innerHTML = lable;
    this.div.classList.add("control-elm");
    if (add) this.add();
  },
  add() {
    if (!this.div || !this.centerElm) {
      log("No DIV found to create as input");
      return;
    }
    this.div.appendChild(this.label);
    this.div.appendChild(this.input);
    this.div.appendChild(this.input);

    let p = document.getElementById("inputs");
    if (p) {
      p.appendChild(this.div);
    } else {
      p = document.createElement("div");
      p.id = "inputs";
      p.appendChild(this.div);
      this.centerElm.appendChild(p);
    }
  },
  addInfo(txt = "") {
    if (!txt || !this.centerElm) return;
    const elm = document.createElement("div");
    elm.innerText = txt;
    elm.classList.add("info");
    this.centerElm.appendChild(elm);
  },
};

const Events = {
  keyEvents: new Map(),
  seperator: "$%$",
  setKey(key = "", event = () => "", type = "click") {
    this.keyEvents.set(key, event);
  },
  setKeys(kv, eventSalt = str(randint())) {
    for (let i of kv) {
      this.keyEvents.set(i[0] + this.seperator + eventSalt, i[1]);
    }
  },
  addClick(elm, event = () => "") {
    try {
      document.querySelector(elm).addEventListener("click", event);
    } catch (e) {
      //log("Error (Events):", e.message)
    }
  },
  listen() {
    this.keyEvents.forEach((v, k) => {
      const s = k.split(this.seperator)[0];

      window.addEventListener("keydown", (ev) => {
        ev.preventDefault();
        const ek = ev.key;
        if (ek === s) {
          log(ek);
          v();
        }
      });
    });
  },
};

/**
 * DOM & other
 */

// local storage object
const Storage = {
  setSession(key, val) {
    sessionStorage.setItem(key, JSON.stringify(val));
  },
  getSession(key) {
    return JSON.parse(sessionStorage[key]);
  },
  setLocal(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
  },
  getLocal(key) {
    return JSON.parse(localStorage[key]);
  },
};

// removes item in html
function removeHTML(item, hide = true) {
  try {
    target = "";
    if (["btnDownload"].includes(item)) {
      target = "#btn_download";
    }
    if (target) {
      if (hide === "show") {
        document.querySelector(target).style.display = "block";
      } else if (hide) {
        document.querySelector(target).style.display = "none";
      } else {
        document.querySelector(target).remove();
      }
      return;
    }
  } catch (e) {
    return;
  }
}

const overlayDIV = {
  d: "",
  set(txt = "overlay", ...classes) {
    this.d = document.createElement("div");
    this.d.classList.add(...classes);
    this.d.innerHTML = txt;
    body.appendChild(this.d);
  },
  remove() {
    this.d.remove();
  },
};
// toggle fullscreen mode
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    cnv.requestFullscreen().catch((err) => {
      alert(
        `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
      );
    });
  } else {
    document.exitFullscreen();
  }
}

// sets name of document
function setWindowLocation(n = false) {
  if (n) {
    document.title = n;
    return;
  }
  const path = document.location.pathname;
  const exploded = path.split("/");
  document.title = glob(exploded[exploded.length - 2]);
}

// retuns a unique id for furthure usage
function getUniqueId(salt = new Date(), maxLen = 24) {
  if (!window.uniqueIds) window.uniqueIds = 0;
  window.uniqueIds += 1;
  return btoa(
    randint(1000) + str(salt) + str(window.uniqueIds) + str(randint(1000))
  ); //.slice(0, maxLen)
}

function binToStr(bin, format = 8) {
  const re = new RegExp(`\s*[01]{${format}}\s*`, "g");
  return bin.replace(re, function (bin) {
    return String.fromCharCode(parseInt(bin, 2));
  });
}

function strToBin(txt, format = 8) {
  if (!txt) return;
  return Array.from(txt)
    .reduce((acc, char) => acc.concat(char.charCodeAt().toString(2)), [])
    .map((bin) => "0".repeat(format - bin.length) + bin)
    .join(" ");
}
