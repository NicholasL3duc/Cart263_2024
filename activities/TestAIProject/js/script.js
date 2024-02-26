/**
 * Title of Project
 * Author Name
 *
 * This is a template. You must fill in the title, author,
 * and this description to match your project!
 */

"use strict";
// the whale let
let whale = {
  x: 250,
  y: 250,
  size: 150,
  vx: 0,
  vy: 0,
  speed: 3.5,
};

let state = "title";

// the images into let
let imgWhale;
let imgTrash;
let imgFish;
let imgDead;
let imghappy;

// the arrays used
let school = [];
let garbage = [];
function preload() {
  // all of the images used
  imgWhale = loadImage(`assets/images/whale.png`);
  imgTrash = loadImage(`assets/images/trash.png`);
  imgFish = loadImage(`assets/images/fish.webp`);
  imgDead = loadImage(`assets/images/deadWhale.webp`);
  imghappy = loadImage(`assets/images/happy.webp`);
}
function title() {
  push();
  textSize(45);
  fill(140, 50, 100);
  textAlign(CENTER, CENTER);
  text(
    "Eat All The Fish And Avoid The Trash!!!",

    width / 2,
    height / 2
  );

  pop();
}
function win() {
  push();
  textSize(64);
  fill(255, 150, 150);
  textAlign(CENTER, CENTER);
  text("Yummy!", width / 2, height / 2);
  text("You Won, Congrats", width / 2, height / 1.5);
  image(imghappy, 600, 50, 200, 200);
  pop();
}
function loss() {
  push();
  textSize(40);
  fill(189, 38, 21);
  textAlign(CENTER, CENTER);
  text("Yucky!! :(", width / 2, height / 2);
  fill(190, 50, 50);
  text("you lose try again", width / 2, height / 1.5);
  image(imgDead, 600, 100, 300, 300);

  pop();
}
function setup() {
  createCanvas(windowWidth, windowHeight);

  //   array for fish
  for (let i = 0; i < 6; i++) {
    school[i] = createFish(random(0, width), random(0, height));
  }

  //    array for trash
  for (let g = 0; g < 4; g++) {
    garbage[g] = createFish(random(0, width), random(0, height));
  }

  whale.x = 50;
  whale.y = windowHeight / 2;
}

// Creation of the fish and trash
function createFish(x, y) {
  let fish = {
    x: x,
    y: y,
    size: 50,
    vx: 0,
    vy: 0,
    speed: 2,
  };
  return fish;
}
function createTrash() {
  let trash = {
    x: x,
    y: y,
    size: 100,
    vx: 0,
    vy: 0,
    speed: 1,
  };
  return trash;
}

function createUser() {
  let user = {
    x: 250,
    y: 250,
    size: 100,
    vx: 0,
    vy: 0,
    speed: 1,
  };
  push();
  image(
    imgWhale,
    user.x - user.size / 2,
    user.y - user.size / 2,
    user.size * 1,
    user.size * 1
  );
  pop();
}

function draw() {
  background(0, 0, 139);
  // all the states
  if (state === "title") {
    title();
  } else if (state === "simulation") {
    simulation();
  } else if (state === "win") {
    win();
  } else if (state === "loss") {
    loss();
  }
  // constraint the whale/user to the canvas
  whale.x = constrain(whale.x, 0, windowWidth);
  whale.y = constrain(whale.y, 0, windowHeight);
}
function simulation() {
  moveWhale(whale);
  for (let fish of school) {
    moveFish(fish);
    displayFish(fish);
    overlapCheckFish();
    displayWhale();
  }
  for (let trash of garbage) {
    moveTrash(trash);
    displayTrash(trash);
    overlapCheckTrash();
  }
}
function moveFish(fish) {
  // Choose whether to change direction
  let change = random(0, 1);
  if (change < 0.05) {
    fish.vx = random(-fish.speed, fish.speed);
    fish.vy = random(-fish.speed, fish.speed);
  }

  // Move the fish
  fish.x = fish.x + fish.vx;
  fish.y = fish.y + fish.vy;

  // Constrain the fish to the canvas

  fish.x = constrain(fish.x, 0, width);
  fish.y = constrain(fish.y, 0, height);
}
function moveTrash(trash) {
  let change = random(0, 1);
  if (change < 0.05) {
    trash.vx = random(-trash.speed, trash.speed);
    trash.vy = random(-trash.speed, trash.speed);
  }

  // Move the trash
  trash.x = trash.x + trash.vx;
  trash.y = trash.y + trash.vy;

  // Constrain the trash to the canvas

  trash.x = constrain(trash.x, 0, width);
  trash.y = constrain(trash.y, 0, height);
}
function moveWhale(whale) {
  if (keyIsDown(87)) {
    //moving using the W key
    whale.vy = -whale.speed;
  } else if (keyIsDown(83)) {
    //moving using the A key
    whale.vy = whale.speed;
  } else {
    whale.vy = 0;
  }

  if (keyIsDown(68)) {
    // moving using the S key
    whale.vx = whale.speed;
  } else if (keyIsDown(65)) {
    // moving using the D key
    whale.vx = -whale.speed;
  } else {
    whale.vx = 0;
  }
  whale.x += whale.vx;
  whale.y += whale.vy;
}
function displayWhale() {
  // display for whale
  push();
  image(imgWhale, whale.x, whale.y, whale.size, whale.size);
  pop();
}

function displayFish(fish) {
  push();
  // display for the fish
  image(imgFish, fish.x, fish.y, fish.size, fish.size);
  pop();
}

function displayTrash(trash) {
  // displaying the trash
  push();
  image(imgTrash, trash.x, trash.y, trash.size, trash.size);
  pop();
}

function overlapCheckFish() {
  // over lap for the fishes from the whale
  for (let fish of school) {
    let s1 = dist(whale.x, whale.y, fish.x, fish.y);
    if (s1 < whale.size / 2 + fish.size / 2) {
      for (let f = 0; f < school.length; f++) {
        let fish = school[f];
        let d = dist(whale.x, whale.y, fish.x, fish.y);
        if (d < fish.size / 2 + whale.size / 2) {
          school.splice(f, 1);
        }
      }
    }
  }
  if (school.length === 0) {
    state = `win`;
  }
}

function overlapCheckTrash() {
  // overlap for the trash on the whale
  for (let trash of garbage) {
    let g1 = dist(whale.x, whale.y, trash.x, trash.y);
    if (g1 < whale.size / 2 + trash.size / 2) {
      state = "loss";
    }
  }
}

// transition from title to sim
function mousePressed() {
  if (state === "title") {
    state = "simulation";
  }
}
