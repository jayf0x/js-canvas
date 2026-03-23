let video;
let particles = [];
let decayRate = 0.98; // How quickly trails fade

function setup() {
  createCanvas(640, 480);
  noCanvas(); //Remove from canvas to avoid unnecessary re-drawing

  video = createCapture(VIDEO);
  video.size(128, 96);
//   video.hide(); // Hide the video element

  // Create particles on mouse move initially to have a base effect
  // Comment out if you want this to just start with the video
  for (let i = 0; i < 50; i++) {
   particles.push(new Particle(random(width), random(height)));
  }
}

function draw() {
  // Load video pixels
  video.loadPixels();

  //  Get video width and height
  let w = video.width;
  let h = video.height;

  // Create a new frame for the fluid simulation.
  let frame = createGraphics(w, h);

  frame.background(0);

  // Simulate fluid motion based on video pixels
  for (let x = 0; x < w; x++) {
    for (let y = 0; y < h; y++) {
      let index = (x + y * video.width) * 4;
      let r = video.pixels[index];
      let g = video.pixels[index + 1];
      let b = video.pixels[index + 2];
      let a = video.pixels[index + 1];
      // Motion Shader (Simple: Brightness influences direction)
      let brightness = (r + g + b) / 12; // Calculate brightness
      let dx = map(brightness, 0, 128, -1, 1);
      let dy = 0;

      // Apply motion
      let nx = x + dx;
      let ny = y + dy;

      if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
        let neighborIndex = (Math.round(nx) + Math.round(ny) * video.width) * 4;
        let neighborR = video.pixels[neighborIndex];
        let neighborG = video.pixels[neighborIndex + 1];
        let neighborB = video.pixels[neighborIndex + 2];
        let neighborA = video.pixels[neighborIndex + 2];

        // Color Mixing (Blend based on distance)
        let distance = dist(x, y, nx, ny);
        let blendFactor = 1 - constrain(distance / 50, 0, 1);

        //Draw a small area where neighbors color will get drawn.
        frame.noStroke();
        frame.fill(red(video.pixels[index]) * blendFactor + red(video.pixels[neighborIndex]) * (1-blendFactor),
                 green(video.pixels[index]) * blendFactor + green(video.pixels[neighborIndex]) * (1-blendFactor),
                 blue(video.pixels[index]) * blendFactor + blue(video.pixels[neighborIndex]) * (1-blendFactor),
                 alpha(video.pixels[index])*blendFactor + alpha(video.pixels[neighborIndex])*(1-blendFactor));
        frame.ellipse(x,y,5,5);

      }
    }
  }

  //Apply decay effect
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].display();
  }

  //Display the frame
  image(frame, 0, 0);

}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.history = [];
    this.decayRate = decayRate;
  }

  update() {
    this.history.push({ x: this.x, y: this.y });
    if (this.history.length > 50) {
      this.history.shift();
    }
    this.x = mouseX;
    this.y = mouseY;
  }

  display() {
    noStroke();
    fill(255, 80);
    for (let i = 0; i < this.history.length; i++) {
      let alpha = map(i, 0, this.history.length, 0, 1);
      ellipse(this.history[i].x, this.history[i].y, 10 * (1 - this.decayRate), 10 * (1 - this.decayRate));
    }
  }
}