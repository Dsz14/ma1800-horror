
let introLines = [
  "You woke up in your office from a bad dream...",
  "Every single part of your body is numb...",
  "Try get out of the building as quick as possible.",
  "There is a fire exit somewhere around the area.",
  "Try get out of there before it is too late.",
  "However...",
  "If you dont make it through in time...",
  "You will die..",
];


let gameState = "menu";
let currentIndex = 0;
let lastChangeTime = 0;
let player1;
let flickerSpeed = 0.20;
let menuBtnW = 300;
let menuBtnH = 80;
let menuBtnX;
let menuBtnY;
let aniX = 0;
let isPlaying = false; 
let canvasWidth, canvasHeight;
let hazardX = 0;
let hazardY = 0;
let hazardSize = 40;




function setup() {
  
  createCanvas(windowWidth, windowHeight);
  canvasWidth = width;
  canvasHeight = height;
  textFont("monospace");

  player1 = new Player();
  menuBtnX = width / 2 - menuBtnW / 2;
  menuBtnY = height / 2;
  lastChangeTime = millis();
  isPlaying = false;
}


function draw() {
  background(0);
  flicker();

  if (gameState === "menu") {
    drawMenu();
  } else if (gameState === "intro") {
    drawIntro();
  } else if (gameState === "main") {
    drawMain();
  } else if (gameState === "gameover") {
    drawGameOver();
  }
}


function windowResized() {  
  resizeCanvas(windowWidth, windowHeight);
  menuBtnX = width / 2 - menuBtnW / 2;
  menuBtnY = height / 2;
}

function drawMenu() {
  textAlign(CENTER, CENTER);
  fill(79, 0, 0);
  textSize(128);
  text("FLICKER", width / 2, height / 2 - 150);

  let hovering = (mouseX > menuBtnX && mouseX < menuBtnX + menuBtnW &&
                  mouseY > menuBtnY && mouseY < menuBtnY + menuBtnH);

  if (hovering) {
    fill(79, 0, 0); 
  } else {
    fill(150); 
  }

  rect(menuBtnX, menuBtnY, menuBtnW, menuBtnH, 8);

  animation();
  fill(0);
  textSize(32);
  text("START", width / 2, menuBtnY + menuBtnH / 2);
  textSize(14);
  fill(200);
  text("Use the arrow keys to move when the game starts", width / 2, menuBtnY + menuBtnH + 30);
}

function drawIntro() {
  fill(139, 0, 0);
  textAlign(LEFT, TOP);
  textSize(32);

  // Show line progressively
  let y = 100;
  for (let i = 0; i < currentIndex; i++) {
    text(introLines[i], 50, y);
    y += 50; 
  }

  if (currentIndex < introLines.length) {
    if (millis() - lastChangeTime > 1200) { 
      currentIndex++;
      lastChangeTime = millis();
    }
  } else {
    if (millis() - lastChangeTime > 1000) {
      gameState = "main";
      isPlaying = true;
      currentIndex = 0; 
      lastChangeTime = millis();
    }
  }
}


function drawMain() {
  if (!isPlaying) return;
  drawHUD();
  player1.draw();
  drawPlaceholders();
}


function drawGameOver() {
  fill(0, 150);
  rect(0, 0, width, height);

  textAlign(CENTER, CENTER);
  fill(255, 0, 0);
  textSize(64);
  text("GAME OVER", width / 2, height / 2);

  textSize(20);
  fill(255);
  text("Click anywhere to return to menu", width / 2, height / 2 + 50);
}


function drawHUD() {
  textAlign(LEFT, TOP);
  textSize(16);
  fill(200);
  text("Arrow keys to move", 20, 20);
  text("Press ESC to go to menu", 20, 40);
}

function drawPlaceholders() {  
hazardX = width - 60;
hazardY = height - 60;
hazardSize = 40;

fill(100);
circle(hazardX, hazardY, hazardSize);

checkHazardCollision();
}


function flicker() {
  let flickerVal = map(sin(frameCount * flickerSpeed), -1, 1, 10, 120);

  fill(0, 0, 0, flickerVal);
  noStroke();
  rect(0, 0, width, height);
}

function animation() { //Tom Keene helped me with this animation function, where I can understand the duration of the animation.
   aniX = map(sin(frameCount * 0.02), -1, 1, 10, 200); // smooth in/out
  fill(255, 0, 0, aniX); 
  circle(100, 200, aniX);

  fill(139, 0, 0, 200);
  circle(menuBtnX - 40, menuBtnY + menuBtnH / 2, aniX / 4);
}

function mousePressed() {
  if (gameState === "menu") {
   
    if (mouseX > menuBtnX && mouseX < menuBtnX + menuBtnW &&
        mouseY > menuBtnY && mouseY < menuBtnY + menuBtnH) {
      
      gameState = "intro";
      currentIndex = 0;
      lastChangeTime = millis();
    }
  }
  
  else if (gameState === "gameover") {
    resetToMenu();
  }
}

function keyPressed() {

  if (keyCode === ESCAPE) {
    resetToMenu();
  }
}

function resetToMenu() {
  
  gameState = "menu";
  currentIndex = 0;
  lastChangeTime = millis();
  isPlaying = false;

 
  player1.resetPosition();  
  menuBtnX = width / 2 - menuBtnW / 2;
  menuBtnY = height / 2;
}


function gameOver() {
  isPlaying = false;
  gameState = "gameover";
}

function checkHazardCollision() {

  let playerX = player1.x;
  let playerY = player1.y;
  let playerRadius = player1.size / 2;

  let hazardRadius = hazardSize / 2;

  let distanceBetween = dist(playerX, playerY, hazardX, hazardY);

  if (distanceBetween < playerRadius + hazardRadius) {
    gameOver();  // Go back to menu screen
  }
}

class Player {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;

    this.size = 40;

    this.speed = 1.5;
  }

  draw() {
  let pulse = sin(frameCount * 0.1) * 3; 
circle(this.x, this.y, this.size + pulse);

    fill(139, 0, 0);

    circle(this.x, this.y, this.size - 10);

    fill(100);
    circle(this.x + 10, this.y + 10, this.size - 30);

    this.move();
  }

  
  move() {
    // Left
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= this.speed;
    }

    // Right
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += this.speed;
    }

    // Up
    if (keyIsDown(UP_ARROW)) {
      this.y -= this.speed;
    }

    // Down
    if (keyIsDown(DOWN_ARROW)) {
      this.y += this.speed;
    }

    let halfSize = this.size / 2;
    this.x = constrain(this.x, halfSize, width - halfSize);
    this.y = constrain(this.y, halfSize, height - halfSize);
  }

  resetPosition() {
    this.x = width / 2;
    this.y = height / 2;
  }
}

