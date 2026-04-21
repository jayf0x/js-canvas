const LAYER_COUNT = 4;
const FPS_CAP = 30;
let lastFrameTime = 0;
let scrollX = 0;
let mouseX = 0;
let zoff = 0;

window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX / window.innerWidth - 0.5;
});

const treeLibrary = Array.from({ length: 10 }, () => {
  const path = new Path2D();
  const iterations = 7;

  function grow(x, y, len, angle, depth) {
    if (depth <= 0) return;
    const x2 = x + len * Math.cos(angle);
    const y2 = y + len * Math.sin(angle);
    path.moveTo(x, y);
    path.lineTo(x2, y2);

    const branches = 4;
    for (let i = 0; i < branches; i++) {
      const nextLen = len * (0.65 + Math.random() * 0.2);
      const nextAngle = angle + (Math.random() - 0.5) * 1.1;
      grow(x2, y2, nextLen, nextAngle, depth - 1);
    }
  }

  grow(0, 0, 30 + Math.random() * 30, -Math.PI / 2, iterations);
  return path;
});

class LandscapeLayer {
  constructor(index) {
    this.index = index;
    this.depth = (index + 1) / LAYER_COUNT;

    this.speed = this.depth * 0.8;
    this.parallaxFactor = this.depth * 100;

    this.colorValue = 220 - this.depth * 180;
    this.yBase = Ymax * (0.3 + (1 - this.depth) * 0.4);

    this.treeSlots = Array.from({ length: 10 }, () => ({
      relX: Math.random() * Xmax * 2,
      treeIdx: Math.floor(Math.random() * treeLibrary.length),
      scale: 0.5 + this.depth * 0.8,
    }));
  }

  getHeight(worldX) {
    const macro =
      noise.simplex2(worldX * 0.001, this.index) * (150 * this.depth);
    const micro = noise.simplex2(worldX * 0.005, this.index * 10) * 20;
    const flatland = Math.sin(worldX * 0.0005) * 50;
    return this.yBase + macro + micro + flatland;
  }

  draw() {
    const xOffset = mouseX * this.parallaxFactor;
    const currentScroll = scrollX * this.speed;

    const grad = ctx.createLinearGradient(0, this.yBase - 200, 0, Ymax);
    const c = this.colorValue;
    grad.addColorStop(0, `rgb(${c},${c},${c})`);
    grad.addColorStop(0.5, `rgba(${c},${c},${c}, 0.2)`);
    grad.addColorStop(1, `rgba(255, 255, 255, 0)`);

    ctx.beginPath();
    ctx.moveTo(0, Ymax);

    for (let x = -100; x <= Xmax + 100; x += 20) {
      const worldX = x + currentScroll + xOffset;
      const y = this.getHeight(worldX);
      ctx.lineTo(x, y);
    }

    ctx.lineTo(Xmax + 100, Ymax);
    ctx.fillStyle = grad;
    ctx.fill();

    ctx.strokeStyle = `rgba(${c - 20}, ${c - 20}, ${c - 20}, 0.8)`;
    ctx.lineWidth = 1 + this.depth;

    this.treeSlots.forEach((slot) => {
      let screenX = (slot.relX - currentScroll - xOffset) % (Xmax * 2);
      if (screenX < -100) screenX += Xmax * 2;

      if (screenX > -50 && screenX < Xmax + 50) {
        const worldX = screenX + currentScroll + xOffset;
        const y = this.getHeight(worldX);

        ctx.save();
        ctx.translate(screenX, y + 2);
        ctx.scale(slot.scale, slot.scale);

        ctx.rotate(Math.sin(zoff + slot.relX) * 0.05);
        ctx.stroke(treeLibrary[slot.treeIdx]);
        ctx.restore();
      }
    });
  }
}

const layers = Array.from(
  { length: LAYER_COUNT },
  (_, i) => new LandscapeLayer(i),
);

function animate(currentTime) {
  requestAnimationFrame(animate);

  const delta = currentTime - lastFrameTime;
  if (delta < 1000 / FPS_CAP) return;
  lastFrameTime = currentTime;

  ctx.fillStyle = "#fcfaf2";
  ctx.fillRect(0, 0, Xmax, Ymax);

  scrollX += 0.3;
  zoff += 0.01;

  layers.forEach((layer) => layer.draw());
}

animate(0);
