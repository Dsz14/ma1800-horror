
let introLines = [
  "You woke up in your office from a bad dream...",
  "Every single part of your body is numb...",
  "A terrifying figure spawns right in front of you.",
  "It just wants to know more about your kind..",
  "Answer its questions truthfully...",
  "However...",
  "If you lie to it...",
  "You will die..",
];

let gameState = "menu"; 
let currentIndex = 0;
let lastChangeTime = 0;


function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont("monospace");
}

function draw() {
  background(0);

  let flicker = map(sin(frameCount * 5), 0, 1, 1, 135);
  fill(flicker, 1, 1);
  noStroke();
  rect(0, 0, width, height);

  if (gameState === "menu") {
    drawMenu();
  } else if (gameState === "intro") {
    drawIntro();
  } else if (gameState === "main") {
    drawMain();
  }
}

let aniX = 0;
function animation(){
  fill(255,0,0, aniX)
  circle(100, 200, aniX);
}

function drawMenu() {
  // Title
  textAlign(CENTER, CENTER);
  fill(79, 0, 0);
  textSize(128);
  text("FLICKER", width / 2, height / 2 - 150);
  

  // Button
  let btnW = 120;
  let btnH = 50;
  let btnX = width / 2 - btnW / 2;
  let btnY = height / 2 + 50;

  // Hover colour
  if (mouseX > btnX && mouseX < btnX + btnW &&
      mouseY > btnY && mouseY < btnY + btnH) {
    fill(79, 0, 0);
  } else {
    fill(150);
  }

  rect(btnX, btnY, btnW, btnH, 0);
  animation()

  fill(0);
  textSize(20);
  text("START", width / 2, btnY + btnH / 2 + 6);
}

function drawIntro() {
  fill(139, 0 ,0);
  textAlign(LEFT, TOP);
  textSize(32);

  // Show lines progressively
  let y = 100;

  for (let i = 0; i < currentIndex; i++) {
    text(introLines[i], 50, y);
    y += 50;
  }

  // Reveal
  if (currentIndex < introLines.length) {
    if (millis() - lastChangeTime > 2000) {
      currentIndex++;
      lastChangeTime = millis();
    }
  }
}


function drawMain(){
    circle(50,50,40);
}

function mousePressed() {
  if (gameState === "menu") {
    // Button geometry
    let btnW = 300;
    let btnH = 80;
    let btnX = width / 2 - btnW / 2;
    let btnY = height / 2;

    // If clicked
    if (mouseX > btnX && mouseX < btnX + btnW &&
        mouseY > btnY && mouseY < btnY + btnH) {

      gameState = "intro";
      currentIndex = 0;
      lastChangeTime = millis();
    }
  }
}