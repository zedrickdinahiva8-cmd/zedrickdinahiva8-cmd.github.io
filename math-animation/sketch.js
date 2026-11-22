// ============================================================
// Bouncing Ball (p5.js) - simple arithmetic + comparisons
// The ball's position changes by adding its speed each frame.
// When it touches an edge, its speed is multiplied by -1
// so it moves the opposite way.
// ============================================================

// ---- Ball position ----
let ballX = 100;          // starting x position (pixels)
let ballY = 80;           // starting y position (pixels)
let ballRadius = 20;      // radius of the ball (pixels)

// ---- Ball speed (pixels moved per frame) ----
let speedX = 4;           // positive = moving right, negative = moving left
let speedY = 3;           // positive = moving down,  negative = moving up

// ---- Other state ----
let framesMoved = 0;      // how many frames the ball has moved
let isPaused = false;     // true when animation is paused

function setup() {
  createCanvas(640, 400);
  textFont('monospace');
}

function draw() {
  background(20, 24, 38);

  if (!isPaused) {
    // 1) THE MATH: new position = old position + speed
    ballX = ballX + speedX;
    ballY = ballY + speedY;
    framesMoved = framesMoved + 1;

    // 2) BOUNDARY CHECK (left/right edges)
    //    The ball touches the right edge when ballX + radius >= width,
    //    and the left edge when ballX - radius <= 0.
    if (ballX + ballRadius >= width || ballX - ballRadius <= 0) {
      speedX = speedX * -1;   // flip direction (4 becomes -4, -4 becomes 4)
    }

    //    Same idea for the top and bottom edges
    if (ballY + ballRadius >= height || ballY - ballRadius <= 0) {
      speedY = speedY * -1;
    }
  }

  // ---- Draw the ball ----
  noStroke();
  fill(255, 90, 90);
  circle(ballX, ballY, ballRadius * 2);

  // ---- Live values (for checking by hand) ----
  fill(230);
  textSize(12);
  textAlign(LEFT, TOP);
  text('frames = ' + framesMoved, 10, 10);
  text('x = ' + ballX + '   speedX = ' + speedX, 10, 26);
  text('y = ' + ballY + '   speedY = ' + speedY, 10, 42);

  // ---- Control instructions on the canvas ----
  fill(160, 220, 160);
  text('SPACE: pause/play    UP/DOWN: speed    R: reset', 10, 360);
  text('CLICK: reverse horizontal direction', 10, 376);
}

// Keyboard controls
function keyPressed() {
  if (key === ' ') {
    isPaused = !isPaused;                          // toggle pause
  } else if (keyCode === UP_ARROW) {
    // make both speeds 1 pixel/frame bigger (keeping their direction)
    speedX = speedX + (speedX > 0 ? 1 : -1);
    speedY = speedY + (speedY > 0 ? 1 : -1);
  } else if (keyCode === DOWN_ARROW) {
    // make both speeds 1 pixel/frame smaller, but never below 1
    if (abs(speedX) > 1) speedX = speedX - (speedX > 0 ? 1 : -1);
    if (abs(speedY) > 1) speedY = speedY - (speedY > 0 ? 1 : -1);
  } else if (key === 'r' || key === 'R') {
    ballX = 100; ballY = 80;                       // back to the start
    speedX = 4;  speedY = 3;
    framesMoved = 0;
  }
  return false; // stops the page scrolling on space/arrows
}

// Mouse control: click the canvas to reverse left/right direction
function mousePressed() {
  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    speedX = speedX * -1;
  }
}
