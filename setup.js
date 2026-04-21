/**
 * -----------------------------
 * SETUP
 *  FUNCTIONS, HELPERS
 * -----------------------------
 * !note:  Most scripts heavily rely on these: do not change
 */

/**
 * Math
 * */

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
  floor,
  round,
  ceil,
  abs,
} = Math;

const PI = Math.PI;
const PI2 = Math.PI * 2;

const degRad = (i) => i * (PI / 180);
const radDeg = function (i, add = false) {
  const res = i * (180 / PI);
  return res + (add && res < 0 ? 360 : 0);
};

let max = Infinity;
let min = -Infinity;

/**
 * Stuff
 */
const DOM = {};
DOM.body = document.querySelector("body");
DOM.brightness = function (n = 0.5) {
  this.body.style.filter = "brightness(" + n + ")";
};
const body = document.querySelector("body");

// if false, events like key-f=>fullscreen, wont be available
let defaultEvents = true;

const hexTable = Object.freeze({
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
});

alphabet = [
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

const pathTo = (distance = 0, name = "assets") => {
  let base = "";
  for (let _ in range(distance)) {
    base += "../";
  }
  return base + name + "/";
};

/**
 * -----------------------------
 * CANVAS SETUP
 * -----------------------------
 * Some functions are from stack overflow, but you will see the difference
 * Some functions are made for a single usage, so might have wierd names or purposes
 * */


const cnv =
  document.getElementById("canvas_01") ||
  document.querySelector("canvas") ||
  document.createElement("canvas");
const ctx = cnv.getContext("2d");

cnv.height = window.innerHeight;
cnv.width = window.innerWidth;

let pause = false;
let exit = false;
let ui1 = true;
const Mid = 400;

const Ymid = cnv.height / 2;
const Ymax = cnv.height;
const Ymin = 0;

const Xmid = cnv.width / 2;
const Xmax = cnv.width;
const Xmin = 0;
const centerObj = { x: Xmid, y: Ymid };

const { moveTo, closePath, beginPath, lineTo } = ctx;

ctx.invert = (n = 1) => {
  cnv.style.filter = `invert(${n})`;
};

ctx.blur = (n = 1) => {
  cnv.style.filter = `blur(${n}px)`;
};

ctx.scaleInvert = () => {
  cnv.style.transform = "scaleY(-1)";
};

ctx.dark = () => {
  cnv.style.backgroundColor = "black";
};

ctx.background = (cl) => {
  cnv.style.backgroundColor = cl;
};

ctx.shade = (cl = "#111", x = 3, y = 3, blur = 10) => {
  ctx.shadowColor = cl;
  ctx.shadowOffsetX = x;
  ctx.shadowOffsetY = y;
  ctx.shadowBlur = blur;
};

function getMouse(evt) {
  const rect = cnv.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top,
  };
}

function createCanvas(w = 1200, h = 800, inherit = true) {
  const otherCNV = document.querySelectorAll("canvas").length + 1;
  const id = "canvas_0" + otherCNV;
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  c.id = id;
  c.classList.add("newCanvas");

  const parent = document.querySelector(".centered")
    ? document.querySelector(".centered")
    : document.querySelector("body");

  parent.appendChild(c);

  window["cnv" + otherCNV] = document.getElementById(id);
  window["ctx" + otherCNV] = window["cnv" + otherCNV].getContext("2d");
  if (inherit) {
    window["ctx" + otherCNV].inherit(ctx);
  }
  return {
    cnvN: window["cnv" + otherCNV],
    ctxN: window["cnv" + otherCNV].getContext("2d"),
  };
}

function clear(setColor = null) {
  if (setColor) {
    rect(0, 0, cnv.width, cnv.height, false, setColor);
  } else {
    ctx.clearRect(0, 0, cnv.width, cnv.height);
  }
}

function line(x1, y1, x2, y2, stroke = null, fill = null) {
  if (isObj(x1)) {
    stroke = x2;
    y2 = y1.y;
    x2 = y1.x;
    y1 = x1.y;
    x1 = x1.x;
  }
  if (stroke) ctx.strokeStyle = stroke;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.closePath();
  ctx.stroke();
}

function drawCross(xa, ya, xb, yb, mx, my) {
  ctx.lineWidth = 2;
  line(xa, Mid, mx, my);
  line(xa, ya, mx, Mid);

  line(xb, Mid, mx, my);
  line(xb, yb, mx, Mid);
}

function rect(x1, y1, x2, y2, stroke = "#000", fill) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y1);
  ctx.lineTo(x2, y2);
  ctx.lineTo(x1, y2);
  ctx.lineTo(x1, y1);

  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.stroke();
  }
  if (fill) {
    ctx.fillStyle = fill;
    ctx.fill();
  }
  ctx.closePath();
}

function square(
  x,
  y,
  size = 1,
  stroke = "#000",
  fill,
  { centered = false } = {}
) {
  ctx.beginPath();
  if (centered) ctx.rect(x - size / 2, y - size / 2, size, size);
  else ctx.rect(x, y, size, size);

  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.stroke();
  }
  if (fill) {
    ctx.fillStyle = fill;
    ctx.fill();
  }
  ctx.closePath();
}

function shade(cl = "#111", x = 3, y = 3, blurr = 10) {
  ctx.shadowBlur = blurr;
  ctx.shadowOffsetX = x;
  ctx.shadowOffsetY = y;
  ctx.shadowColor = cl;
}

function fillText(txt, x, y, color, s = null) {
  if (s) font(s, color || ctx.fillStyle);
  ctx.fillText(txt, x, y);
}

function point(x, y, s = 10, fill) {
  if (isObj(x)) {
    fill = s;
    s = y || s;
    y = x.y;
    x = x.x;
  }
  circle(x, y, s / 2, null, fill);
}

function dot(x, y, s = 1) {
  circle(x, y, s / 2);
}

function markPoint(x, y, s = 20, { txt, stroke = "red" } = {}) {
  ctx.lineWidth = 3;
  square(x, y, s, stroke, false, { centered: true });
  point(x, y, 5, stroke);
  if (txt != undefined) {
    if (s / 3 > 14) ctx.font = s / 3 + "px verdana";
    ctx.fillText(txt, x - s / 2, y - s / 2);
  }
}

function circle(x = Xmid, y = Ymid, r = 200, stroke = "#111", fill) {
  if (r < 0) r *= -1;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.stroke();
  }
  if (fill) {
    ctx.fillStyle = fill;
    ctx.fill();
  }
  ctx.closePath();

  // let lp = null
  // for(let i = 0; i< 360;i++){
  //    const a = degRad(i)
  //    const x1 = mx + Math.cos(a) * r
  //    const y1 = my + Math.sin(a) * r
  //    if(!lp){
  //       lp={x:x1,y:y1}
  //    }

  //    linelp.x, lp.y, x1, y1)
  //    lp.x = x1
  //    lp.y = y1

  // }
}

function ellipse(
  x,
  y,
  radiusX,
  radiusY,
  rotation,
  startAngle,
  endAngle,
  stroke,
  fill
) {
  ctx.beginPath();
  ctx.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle);

  if (fill) {
    ctx.fillStyle = fill;
    ctx.fill();
  } else {
    ctx.strokeStyle = stroke;
    ctx.stroke();
  }
}

function rectRounded(
  x,
  y,
  x2,
  y2,
  stroke = "#111",
  fill = "",
  { radius = 5 } = {}
) {
  if (typeof radius === "number") {
    radius = { tl: radius, tr: radius, br: radius, bl: radius };
  } else {
    let defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
    for (let side in defaultRadius) {
      radius[side] = radius[side] || defaultRadius[side];
    }
  }
  ctx.beginPath();
  ctx.moveTo(x + radius.tl, y);
  ctx.lineTo(x2 - radius.tr, y);
  ctx.quadraticCurveTo(x2, y, x2, y + radius.tr);
  ctx.lineTo(x2, y2 - radius.br);
  ctx.quadraticCurveTo(x2, y2, x2 - radius.br, y2);
  ctx.lineTo(x + radius.bl, y2);
  ctx.quadraticCurveTo(x, y2, x, y2 - radius.bl);
  ctx.lineTo(x, y + radius.tl);
  ctx.quadraticCurveTo(x, y, x + radius.tl, y);
  ctx.closePath();
  if (fill) {
    ctx.fillStyle = fill;
    ctx.fill();
  }
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.stroke();
  }
}

function triangle(
  x = Xmid,
  y = Ymid,
  s = 100,
  fill = false,
  { rotate = 0, sides = 3, stroke = true, sharpness = 0 } = {}
) {
  const a = (Math.PI * 2) / sides;
  rotate = (51.9 + rotate * 1.165) / 100;
  // 51 to make 0 at 90° pos
  // * 1.165 is (apprximately) number that makes this coord a 360 scale
  // and /100 for scaleing because this accepts small nums
  if (stroke) ctx.strokeStyle = stroke;
  ctx.beginPath();
  for (let i = 0; i < sides; i++) {
    if (sharpness && i == 0)
      ctx.lineTo(
        x + (s + s * sharpness) * Math.cos(a * i + rotate),
        y + (s + s * sharpness) * Math.sin(a * i + rotate)
      );
    else
      ctx.lineTo(
        x + s * Math.cos(a * i + rotate),
        y + s * Math.sin(a * i + rotate)
      );
  }
  ctx.closePath();
  if (fill) {
    ctx.fillStyle = fill;
    ctx.fill();
  } else ctx.stroke();
}

function equilateralTriangle(x, y, s, rotate = 0, fill = null, stroke = null) {
  // under production !! !! !!
  //rotate*=10
  const _x = x + s * cos(rotate);
  const _y = y + s * sin(rotate);

  ctx.beginPath();
  ctx.moveTo(_x, _y);
  ctx.lineTo(_x + s, _y);
  ctx.lineTo(_x + s / 2, _y + s);
  ctx.closePath();

  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.stroke();
  }
  if (fill) {
    ctx.fillStyle = fill;
    ctx.fill();
  }
}

function flatTriangleEffect(x, y, size = 200, ri = 0) {
  ri += 135;
  const res = [];
  function getAngle(n = 90, s = size) {
    const ang = PI2 * (n / 360) - PI2 / 4,
      xn = x + Math.cos(ang) * s,
      yn = y + Math.sin(ang) * s;
    return { x: round(xn), y: round(yn) };
  }
  res.push({ x: x, y: y }, getAngle(ri), getAngle(ri + 90));

  ctx.beginPath();
  ctx.moveTo(x, y);
  for (let i of res) {
    ctx.lineTo(i.x, i.y);
  }
  ctx.closePath();
  ctx.stroke();
  return res;
}

async function drawImage(
  name,
  shapeSize = 1,
  offset = 0,
  { pathDistance = 0 } = {}
) {
  return new Promise((resolve, reject) => {
    if (!name) reject("no image path found");
    else {
      const img = new Image();
      img.src = pathTo(pathDistance) + name;
      img.onload = () => {
        ctx.drawImage(
          img,
          offset,
          offset,
          img.width * shapeSize,
          img.height * shapeSize
        );
        resolve(img);
      };
      img.onerror = reject;
    }
  });
}

// format is e.g. [ [[0,0], [9,35], [60,50], [92,125], [100,100], [150,150]], [[0,0], [19,25], ...], ...]
function graphXY(
  data = [
    [
      [0, 0],
      [9, 35],
      [60, 50],
      [92, 125],
      [100, 100],
      [150, 150],
    ],
  ],
  { guides = true, scale = 2, margins = 100, color = "red", lines = true } = {}
) {
  if (!data || !data.length) {
    return console.error("No data found to graph");
  }
  if (!isArray(data[0])) {
    data = [data];
  }

  function AZ123(d, c = color) {
    ctx.strokeStyle = c;
    ctx.beginPath();
    ctx.moveTo(Xmin + margins + d[0][0], Ymax - margins - d[0][1]);
    d.forEach((i) => {
      let ax = Xmin + margins + i[0] * scale;
      let ay = Ymax - margins - i[1] * scale;

      ctx.lineTo(ax, ay);
      // point(ax, ay, 3, "blue")
      // ctx.fillText(`${i[0]};${i[1]}`,ax, ay)
    });
    ctx.stroke();
    ctx.closePath();
  }

  function getScale(num, limit = 5 * scale) {
    let r = round(num % ((num / limit) * 2));
    if (r === 0) {
      r = round(num / limit);
    }
    return r;
  }

  const xArr = range(
    Math.max(
      ...data.map((i) => i.reduce((a, i) => (a = a > i[0] ? a : i[0]), 0))
    )
  );
  const yArr = range(
    Math.max(
      ...data.map((i) => i.reduce((a, i) => (a = a > i[1] ? a : i[1]), 0))
    )
  );

  const filter = {
    x: getScale(xArr.length),
    y: getScale(yArr.length),
  };
  if (lines) {
    line(Xmin + margins, Ymin + margins, Xmin + margins, Ymax - margins);
    line(Xmin + margins, Ymax - margins, Xmax - margins, Ymax - margins);
  }

  if (guides) {
    ctx.strokeStyle = "black";

    xArr.forEach((i, idx, arr) => {
      if (idx % filter.x === 0 || idx === arr.length - 1)
        ctx.fillText(i, Xmin + margins - 15, Ymax - margins - i * scale);
    });
    yArr.forEach((i, idx, arr) => {
      if (idx % filter.y === 0 || idx === arr.length - 1)
        ctx.fillText(i, Xmin + margins + i * scale, Ymax - margins + 10);
    });
  }

  data.forEach((d, i, a) =>
    AZ123(d, hsl((360 / a.length) * i, 50, (80 / data.length) * i))
  );
}

function simpleGraph(
  arr,
  { stroke = "green", lineWidth = 5, margin = 0 } = {}
) {
  const sx = Xmax / arr.length - margin;
  const sy = Ymax / Math.max(...arr);

  ctx.strokeStyle = stroke;
  ctx.lineWidth = lineWidth;

  ctx.beginPath();
  for (let i = 0; i < arr.length; i++) {
    let a = arr[i];
    let b = arr[i + 1] || a;

    let x = margin + i * sx;
    let y = margin + b * sy;
    ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.closePath();
}

function contrastImage(imageData, contrast) {
  // contrast as an integer percent
  let data = imageData.data; // original array modified, but canvas not updated
  contrast *= 2.55; // or *= 255 / 100; scale integer percent to full range
  let factor = (255 + contrast) / (255.01 - contrast); //add .1 to avoid /0 error

  for (
    let i = 0;
    i < data.length;
    i += 4 //pixel values in 4-byte blocks (r,g,b,a)
  ) {
    if (data[i + 3] && data[i + 3] < 256) {
      data[i] = factor * (data[i] - 128) + 128; //r
      data[i + 1] = factor * (data[i + 1] - 128) + 128; //g
      data[i + 2] = factor * (data[i + 2] - 128) + 128; //b
    }
  }
  return imageData; //optional (e.g. for filter function chaining)
}

function font(size = 20, color, font = "verdana") {
  if (color) ctx.fillStyle = color;
  ctx.font = `${size}px ${font}`;
}

function textCenter(txt, size = 20, color = null) {
  const l = ctx.font;
  if (color) ctx.fillStyle = color;
  txt = str(txt);
  ctx.font = size + "px verdana";
  ctx.fillText(txt, Xmid - (txt.length * size) / 3.2, Ymid);
  ctx.font = l;
}

function fillText(txt, x, y, color, size) {
  if (size) ctx.font = size + "px arial";
  if (color) ctx.fillStyle = color;
  ctx.fillText(txt, x, y);
}

function setLightSpot({
  x,
  y,
  z,
  radius,
  color: cl = "#fff",
  varLight = 1,
  gradient,
}) {
  ctx.save();
  // ctx.globalCompositeOperation = "lighter";
  if (gradient) {
    ctx.fillStyle = gradient;
  } else {
    const rnd = 0.05 * Math.sin((Date.now() / 1000000) * varLight);
    radius = ceil(radius * (1 + rnd));
    const grd = ctx.createRadialGradient(x, y, 0, x, y, radius);

    grd.addColorStop(0.0, cl + hexTable[str(floor(15 * z || 0))]);
    grd.addColorStop(0.2 + rnd, cl + hexTable[str(floor(10 * z || 0))]);
    grd.addColorStop(0.5 + rnd, cl + hexTable[str(floor(6 * z || 0))]);
    grd.addColorStop(1, cl + 0);

    ctx.fillStyle = grd;
  }
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * PI);
  ctx.fill();
  ctx.restore();
}

function newGradient({
  x = Xmid,
  y = Ymid,
  radius = 40,
  color = 10,
  colorArr,
  steps = 3,
  linear = false,
  saturation = 100,
  maxBrightness = 100,
  minBrightness = 0,
  linearColor = 0,
  linearSaturation = 0,
  linearBrightness = 0,
}) {
  const grd = linear
    ? ctx.createLinearGradient(x, y, x, y)
    : ctx.createRadialGradient(x, y, 0, x, y, radius);
  if (colorArr) {
    for (let idx = 0; idx < colorArr.length; idx++) {
      grd.addColorStop(mapNum(idx, 0, colorArr.length, 0, 1), colorArr[idx]);
    }
  } else {
    for (let i of range(steps))
      grd.addColorStop(
        i / steps,
        hsl(
          color + linearColor * i,
          saturation - (linearSaturation ? linearSaturation * (1 + i) : 0),
          mapNum(steps - i, 0, steps, minBrightness, maxBrightness) -
            (linearBrightness ? linearBrightness * (1 + i) : 0)
        )
      );
  }

  return grd;
}

/**
 * -----------------------------
 * Functions, helpers, prototype
 * -----------------------------
 */

// Object.prototype.add = function(key, amount) {
//     this[key] += amount;
//     log(key)
// };

Object.is = function (item) {
  return item && typeof item === "object" && !Array.isArray(item);
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

/**
 * deepMerge
 * @returnn Object
 * @source https://stackoverflow.com/a/37164538
 */
function deepMerge(target, source) {
  const output = Object.assign({}, target);
  if (Object.is(target) && Object.is(source)) {
    Object.keys(source).forEach((key) => {
      const sk = source[key];
      if (Object.is(sk) && !isClass(sk)) {
        if (!(key in target)) Object.assign(output, { [key]: sk });
        else output[key] = deepMerge(target[key], sk);
      } else {
        Object.assign(output, { [key]: sk });
      }
    });
  }
  return output;
}

Object.prototype.flip = function () {
  const flipped = Object.entries(this).map(([key, value]) => [value, key]);
  return Object.fromEntries(flipped);
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

Array.prototype.rsplice = function (count = 1) {
  return this.splice(0, this.last(1, true) - (count - 1));
};

Array.prototype.scaleBetween = function (scaledMin, scaledMax) {
  const max = Math.max.apply(Math, this);
  const min = Math.min.apply(Math, this);
  return this.map(
    (num) => ((scaledMax - scaledMin) * (num - min)) / (max - min) + scaledMin
  );
};

Array.prototype.random = function () {
  return this[randint(this.length - 1)];
};

Array.prototype.sum = function () {
  let t = 0;
  for (let i of this) {
    t += i;
  }
  return t; // this.reduce((t, i) => t + i, 0);
};

Array.prototype.average = function () {
  return this.sum() / this.length;
};

Array.prototype.randomRange = function (amount = 1, asString = false) {
  const res = [];
  for (let n of range(amount)) {
    res.push(this[randint(this.length - 1)]);
  }
  return asString ? res.join("") : res;
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

Array.prototype.first = function (idx = 0) {
  return this[0];
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

String.prototype.padd = function (length, padd, left) {
  const s = repeatS(padd, length - this.length);
  return left ? s + this.valueOf() : this.valueOf() + s;
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

JSON.copy = function copy(n) {
  return JSON.parse(JSON.stringify(n));
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

function smoothSquareWave(t, delta = 0.1, amp = 1, freq = 1 / PI2) {
  // https://dsp.stackexchange.com/questions/35211/generating-smoothed-versions-of-square-wave-triangular-etc
  return (amp / atan(1 / delta)) * atan(sin(2 * PI * t * freq) / delta);
}

function parseColor(arr) {
  let res = arr.map(hex).join("");
  if (res === "000000") res = "ffffff";
  return "#" + res;
}

function overCount(i, max, min = 0, nullable = true) {
  let stopinifnite = 0;
  while (i >= max) {
    stopinifnite++;
    if (stopinifnite > 1000) exitting("INFITE max");
    if (nullable && i == 0) return i;
    i -= max;
  }
  while (i < min) {
    stopinifnite++;
    if (stopinifnite > 1000) exitting("INFITE min");

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

function toFixed(nr, amt = 3) {
  return +nr.toFixed(amt);
}

function numMax(n, max) {
  return n > max ? max : n;
}

function range(n = 1, step = 1) {
  if (n < 0) return nRange(n);
  let res = [];
  for (let i = n < 0 ? n : 0; i < n; i += step) {
    res.push(+i);
  }
  return res;
}

function nRange(n = 1) {
  if (n > 0) return range(n);
  let res = [];
  for (let i = 0; i > n; i--) {
    res.push(i);
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
  if (pause) {
    if (overlay) overlayDIV.set("=", "overlay-pause", "overlay-fixed");
    //else textCenter("||", 200, "white")
    let timeout = 0;
    while (pause) {
      await sleep();
      timeout++;
      if (timeout > 2000) {
        pause = false;
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
  return Object.is(n);
}

function isClass(a) {
  return !Object.is(a) && a.__proto__.constructor.name !== "Object";
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
function scaleNum(inp, minInput, maxInput, minOutput, maxOutput) {
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
  const res = b ? Math.random() * (b - a) + a : Math.random() * (a - b) + b;
  return fixed ? toFixed(res, fixed) : res;
  // return toFixed(b ? a + Math.random() * (b * 2) : Math.random() * a, fixed)
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

const { log, info, warn } = console;
// function log(...args) {
//     console.log(...args)
// }

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

function getNeighboursByDimension(dim = 1, x, y, scale = 1) {
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

function inRange(a, b, rang = 10, neg, try2) {
  for (let i = neg ? -rang : 0; i <= rang; i += 1) {
    if (round(a + i) === round(b)) {
      return i;
    }
  }
  return try2 ? false : inRange(b, a, rang, neg, true);
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

function mulberry32(a) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
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

const tryAndLog = (n) => {
  try {
    n();
  } catch (e) {
    console.error(e);
  }
};

class Vector extends Array {
  /**
   * Create Vector.
   * @param {Array} array - Array to be unpacked and used to create Vector.
   *
   * This behavior is the same for length 1 Array.
   */
  constructor(x = 0, y = 0, z = 0) {
    super([]);
    this.x = x;
    this.y = y;
    this.z = z;
  }

  randomVilocity(speed = 1) {
    const phi = 2 * PI * Math.random();
    return {
      x: speed * cos(phi),
      y: speed * sin(phi),
    };
  }
  fromAngle(a, length = 1) {
    this.x = length * Math.cos(a);
    this.y = length * Math.sin(a);
    this.z = 0;
    return { x: this.x, y: this.y, z: this.z };
  }
  /**
   * Add elementwise.
   * @param {Vector} other - Other summand
   * @returns {Vector} Vector sum
   */
  add(other) {
    return this.map((e, i) => e + other[i]);
  }

  /**
   * Subtract elementwise.
   * @param {Vector} other - Subtrahend
   * @returns {Vector} Vector difference
   */
  sub(other) {
    return this.map((e, i) => e - other[i]);
  }

  /**
   * Multiply elementwise (Hadamard product).
   * @param {Vector} other - Other multiplicand
   * @returns {Vector} Vector elementwise product
   */
  mul(other) {
    return this.map((e, i) => e * other[i]);
  }

  /**
   * Sum elements.
   * @returns {Number} Sum of elements
   */
  sum() {
    return this.reduce((a, b) => a + b);
  }

  /**
   * Scale elements.
   * @param {Number} s - Factor to scale elements by
   * @returns {Vector} Scaled vector.
   */
  scale(s) {
    return this.map((e) => s * e);
  }

  /**
   * Dot product.
   * @param {Vector} other - Other vector to dot product with
   * @returns {Number} Dot product
   */
  dot(other) {
    return this.mul(other).sum();
  }

  /**
   * Compute Euclidean (L2) norm.
   * @returns {number} Euclidean norm
   */
  norm() {
    return Math.sqrt(this.dot(this));
  }

  /**
   * Normalize (scale) to a unit vector.
   * @returns {Vector} Unit vector
   */
  unit() {
    return this.scale(1 / this.norm());
  }
  rotateY(theta_n, assign = true) {
    const { x, y, z } = this;
    if (assign) {
      this.x = Math.cos(theta_n) * x - Math.sin(theta_n) * z;
      this.z = Math.sin(theta_n) * x + Math.cos(theta_n) * z;
    } else {
      return {
        x: Math.cos(theta_n) * x - Math.sin(theta_n) * z,
        y: y,
        z: Math.sin(theta_n) * x + Math.cos(theta_n) * z,
      };
    }
  }

  rotateX(theta_n, assign = true) {
    const { x, y, z } = this;
    if (assign) {
      this.y = Math.cos(theta_n) * y - Math.sin(theta_n) * z;
      this.z = Math.sin(theta_n) * y + Math.cos(theta_n) * z;
    } else {
      return {
        x: x,
        y: Math.cos(theta_n) * y - Math.sin(theta_n) * z,
        z: Math.sin(theta_n) * y + Math.cos(theta_n) * z,
      };
    }
  }
}

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
  init() {
    this.centerElm = document.createElement("div");
    this.centerElm.id = "controls";
    cnv.parentElement.appendChild(this.centerElm);
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
  listener: null,
  setKey(key = "", event = () => "", type = "click") {
    this.keyEvents.set(key, event);
  },
  setKeys(kv, seperator = this.seperator) {
    for (let i of kv) {
      this.keyEvents.set(i[0] + this.seperator, i[1]);
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
    // this.keyEvents.forEach((v, k) => {
    //   const s = k.split(this.seperator)[0];

    this.listener = window.addEventListener("keydown", (ev) => {
      // ev.preventDefault();
      this.keyEvents.get(ev.key + this.seperator)?.();
    });
    // });
  },
};

window.onload = () => {
  try {
    // init events
    defaultEvents &&
      setTimeout(() => {
        if (defaultEvents) {
          Events.setKeys([
            [" ", () => (pause = !pause)],
            ["f", () => toggleFullscreen()],
            ["r", () => window.location.reload()],
          ]);

          Events.addClick("#btn_download", () => {
            const l = document.createElement("a");
            l.download = "canvas_img.png";
            l.href = cnv.toDataURL();
            l.click();
            l.delete;
          });
          Controls.addInfo(
            "Events: " +
              [...Events.keyEvents.keys()]
                .map((i) => i.split(Events.seperator)[0])
                .join(", ")
          );
          Events.listen();
          setWindowLocation();
        }
        window.addEventListener("keydown", (ev) => {
          // ev.preventDefault();
          const ek = ev.key;
          Events.keyEvents.forEach((v, k) => {
            const s = k.split(Events.seperator)[0];
            if (ek === s) {
              v();
            }
          });
        });
      }, 200);
  } catch (e) {
    textCenter("LOAD Error: " + e.message);
    log(e);
  }
};

/**
 * Special
 */

class UseState {
  constructor(initialValue) {
    this.value = JSON.copy(initialValue);
    this.id = getUniqueId();
    window[this.id] = this.value;
    // i just realised that useState is vanilla is kinda useless
  }
  get value() {
    return this.value;
  }
  set value(setter) {
    if (typeof newVal != "function")
      throw `seState - type: "Function" is required as parameter`;
    this.value = setter(this.value);
  }
}

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

// copies to clipboard
function copyToClipboard(text) {
  if(!document.queryCommandSupported('copy')) {
    throw new Error("Copy action either depricated or not allowed via `document.queryCommandSupported('copy')`.")
  }
  let dummy = document.createElement("textarea");
  document.body.appendChild(dummy);
  dummy.value = text;
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
}

// catches all window errors
// window.onerror = function (msg, url, line) {
//     return
//     clear()
//     textCenter("Error : " + msg);
//     // log("Message : " + msg);
//     // log("url : " + url);
//     // log("Line number : " + line);
// }
