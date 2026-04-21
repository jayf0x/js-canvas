let zoff = 0;

// noise
const df = 200;
const noiseScale = 0.1;

class Tree {
  constructor(x, y) {
    this.deltaAngle = randint(1, 10);
    this.rotation = 90;
    this.speed = (1 + randfloat()) / 3;
    this.points = [];
    this.x = x * Xmax;
    this.y = y * Ymax;

    // full three angle
    this.angle = degRad(90);

    // how far it branches
    this.attenuation = 0.8 + randfloat() / 10;

    this.gradientLength = 40;

    // how far it's spread
    this.spread = randint(12, 40);

    this.startLength = 20;

    this.startLength = 30;
    this.minLength = 10;
    this.tree_depth = 10;
  }

  iter() {
    this.points.length = 0;

    const a = this.rotation + Math.sin(zoff / 100) * 10;

    this.angleVal = this.spread + sin(zoff / 1) * 2;

    this.make(this.x, this.y, this.startLength, a, this.tree_depth);
  }
  make(x1, y1, len, _angle, _depth) {
    if (_depth < 0) return;
    if (len < this.minLength) return;
    const t =
      len < this.minLength * this.gradientLength
        ? mapNum(len, 0, this.minLength * this.gradientLength, 0, 0.8)
        : 1;

    const _x1 = x1 - len * cos((_angle * PI) / 180);
    const _y1 = y1 - len * sin((_angle * PI) / 180);
    const { x: _x2, y: _y2 } = perlinize(_x1, _y1, (1 - t) * noiseScale);

    const _x = _x1 + _x2;
    const _y = _y1 + _y2;

    this.points.push([
      x1,
      y1,
      _x,
      _y,
      hsl(mapNum(len, this.minLength, this.startLength, 0, 360), 0, 30, t),
      len,
    ]);

    this.make(
      _x,
      _y,
      len * this.attenuation,
      _angle + this.angleVal,
      _depth - 1,
    );
    this.make(
      _x,
      _y,
      len * this.attenuation,
      _angle - this.angleVal,
      _depth - 1,
    );
  }
  draw() {
    for (let i of this.points) {
      ctx.lineTo(i[0], i[1]);
    }
  }
}

// outputs a small noise deviation
function perlinize(x, y, s) {
  let a = ((1 + noise.simplex3(x / df, y / df, zoff)) * 1.1 * 128) / 1000;
  return rotateVector(x * s, y * s, a);
}

const trees = [0.2, 0.4, 0.1, 0.9, 0.5].map((x) => new Tree(x, 0.5));

async function animate() {
  clear();

  for (let i of trees) {
    i.iter();
  }
  ctx.beginPath();
  for (let i of trees) {
    i.draw();
  }
  ctx.closePath();
  ctx.stroke();

  zoff += 0.01;
  requestAnimationFrame(animate);
}

ctx.invert();
animate();
