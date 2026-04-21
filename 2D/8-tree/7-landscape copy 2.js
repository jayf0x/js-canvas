const HILL_SMOOTHNESS = 400; // higher = flatter
const HILL_INTENSITY = 50;

let zoff = 0;

function getHillY(x, seed = 0) {
  const baseY = Ymax * 0.7;
  const noiseVal = noise.simplex2(x / HILL_SMOOTHNESS, seed);
  return baseY + noiseVal * HILL_INTENSITY;
}

class Tree {
  constructor(xPercent) {
    this.x = xPercent * Xmax;
    this.y = getHillY(this.x);

    this.seed = Math.random() * 1000;
    this.maxDepth = randint(6, 9);
    this.branchShrink = 0.7 + randfloat() * 0.15;
    this.spread = randint(15, 35);
    this.trunkLen = randint(40, 80);

    const grey = randint(20, 80);
    this.color = hsl(0, 0, grey);
  }

  draw(zoff) {
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 2;
    const sway = Math.sin(zoff + this.seed) * 5;
    this.branch(this.x, this.y, this.trunkLen, -90 + sway, this.maxDepth);
  }

  branch(x, y, len, angle, depth) {
    if (depth === 0) return;

    const x2 = x + len * Math.cos(degRad(angle));
    const y2 = y + len * Math.sin(degRad(angle));

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    const newLen = len * this.branchShrink;
    const curl = Math.sin(depth + zoff) * 2;

    this.branch(x2, y2, newLen, angle - this.spread + curl, depth - 1);
    this.branch(x2, y2, newLen, angle + this.spread + curl, depth - 1);
  }
}

const nrTrees = round(window.innerWidth / 100);
const landscapeTrees = range(nrTrees).map(
  (i, idx, arr) => new Tree(i / arr.length + randfloat() * 0.05),
);

const hillPoints = range(Xmax, 10).map((x) => {
  const y = getHillY(x);
  return [x, y];
});

// function drawHillLine() {
//   ctx.beginPath();
//   ctx.lineWidth = 4;
//   ctx.strokeStyle = hsl(0, 0, 90);
//   for (const [x, y] of hillPoints) {
//     if (x === 0) ctx.moveTo(x, y);
//     else ctx.lineTo(x, y);
//   }
//   ctx.stroke();
// }


function drawHillLine() {
  ctx.beginPath();
  ctx.lineWidth = 4;
  ctx.strokeStyle = hsl(0, 0, 90); // Light grey for the hill line
  for (let x = 0; x <= Xmax; x += 10) {
    const y = getHillY(x);
    if (x === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
}

async function animate() {
  clear();

  drawHillLine();

  for (let tree of landscapeTrees) {
    tree.draw(zoff);
  }

  zoff += 0.02;
  requestAnimationFrame(animate);
}
ctx.invert();
animate();
