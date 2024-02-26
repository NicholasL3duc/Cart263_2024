class Animation {
/**
 * Title of Project
 * Author Name
 *
 * This is a template. You must fill in the title, author,
 * and this description to match your project!
 */

"use strict";
constructor() {
    // We should always call the superclass constructor
    // even if it doesn't do anything right now. It might
    // later!
 
// the whale let
this.whale = {
  x: 250,
  y: 250,
  size: 150,
  vx: 0,
  vy: 0,
  speed: 3.5,
};
}


 preload() {

}

title() {
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
win() {
  push();
  textSize(64);
  fill(255, 150, 150);
  textAlign(CENTER, CENTER);
  text("Yummy!", width / 2, height / 2);
  text("You Won, Congrats", width / 2, height / 1.5);
  image(imghappy, 600, 50, 200, 200);
  pop();
}
loss() {
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
setup() {
  createCanvas(windowWidth, windowHeight);

  //   array for fish
  for (this.i = 0; i < 6; i++) {
    school[i] = createFish(random(0, width), random(0, height));
  }

  //    array for trash
  for (this.g = 0; g < 4; g++) {
    garbage[g] = createFish(random(0, width), random(0, height));
  }

  whale.x = 50;
  whale.y = windowHeight / 2;
}

// Creation of the fish and trash
 createFish(x, y) {
  this.fish = {
    x: x,
    y: y,
    size: 50,
    vx: 0,
    vy: 0,
    speed: 2,
  };
  return fish;
}
 createTrash() {
  this.trash = {
    x: x,
    y: y,
    size: 100,
    vx: 0,
    vy: 0,
    speed: 1,
  };
  return trash;
}

 createUser() {
  this.user = {
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

 draw() {
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
 simulation() {
  moveWhale(whale);
  for (this.fish of school) {
    moveFish(fish);
    displayFish(fish);
    overlapCheckFish();
    displayWhale();
  }
  for (this.trash of garbage) {
    moveTrash(trash);
    displayTrash(trash);
    overlapCheckTrash();
  }
}
 moveFish(fish) {
  // Choose whether to change direction
  this.change = random(0, 1);
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
 moveTrash(trash) {
  this.change = random(0, 1);
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
 moveWhale(whale) {
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
 displayWhale() {
  // display for whale
  push();
  image(imgWhale, whale.x, whale.y, whale.size, whale.size);
  pop();
}

 displayFish(fish) {
  push();
  // display for the fish
  image(imgFish, fish.x, fish.y, fish.size, fish.size);
  pop();
}

 displayTrash(trash) {
  // displaying the trash
  push();
  image(imgTrash, trash.x, trash.y, trash.size, trash.size);
  pop();
}

 overlapCheckFish() {
  // over lap for the fishes from the whale
  for (this.fish of school) {
    this.s1 = dist(whale.x, whale.y, fish.x, fish.y);
    if (s1 < whale.size / 2 + fish.size / 2) {
      for (this.f = 0; f < school.length; f++) {
        this.fish = school[f];
        this.d = dist(whale.x, whale.y, fish.x, fish.y);
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

 overlapCheckTrash() {
  // overlap for the trash on the whale
  for (this.trash of garbage) {
    this.g1 = dist(whale.x, whale.y, trash.x, trash.y);
    if (g1 < whale.size / 2 + trash.size / 2) {
      state = "loss";
    }
  }
}






}