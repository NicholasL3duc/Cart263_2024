let handpose;
let video;
let pointerX, pointerY, knuckle, ring;

// the whale let
let whale = {
    x: 250,
    y: 250,
    size: 70,
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
  let hands = [];
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
    //   push();
    // // translate(video.width, 0);
    // scale(-1, 1);
    // image(video, 0, 0, width, height);
    // pop();
    createCanvas(640,480);
    //   array for fish
    for (let i = 0; i < 3; i++) {
      school[i] = createFish(random(0, width), random(0, height));
    }
  
    //    array for trash
    for (let g = 0; g < 4; g++) {
      garbage[g] = createFish(random(0, width), random(0, height));
    }
  
    pointerX = 50;
    pointerY = windowHeight / 2;

  video = createCapture(VIDEO);
  video 
  video.size(width, height);
  push();
  translate(video.width, 0);
  scale(-1, 1);
  image(video, 0, 0, width, height);
  pop();

  handpose = ml5.handpose(video, modelReady);

  // This sets up an event that fills the global variable "predictions"
  // with an array every time new hand poses are detected
  handpose.on("hand", results => {
    hands = results;
  });

  // Hide the video element, and just show the canvas
  video.hide();
}

// Creation of the fish and trash
function createFish(x, y) {
  let fish = {
    x: x,
    y: y,
    size: 40,
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
    size: 20,
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
 

function modelReady() {
  console.log("Model ready!");
}

function draw() {
  image(video, 0, 0,width,height);

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
  pointerX = constrain(pointerX, 0, windowWidth);
  pointerY = constrain(pointerY, 0, windowHeight);
  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints();

  Simulation();
   
}

function Simulation() {
//   moveWhale(this.whale);
for (fish of school) {
    moveFish(this.fish);
    displayFish(this.fish);
    overlapCheckFish();
    displayWhale();
    // moveWhale(whale);
  }
  for (this.trash of garbage) {
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
 
  
  function displayFish(fish) {
    push();
    // display for the fish
    image(imgFish, fish.x, fish.y, fish.size, fish.size);
    pop();
  }
 function displayWhale() {
    // display for whale
    push();
    //  image(imgWhale,keypoint[0], keypoint[1], whale.size, whale.size);
    pop();

  }
  function displayTrash(trash) {
    // displaying the trash
    push();
    image(imgTrash, trash.x, trash.y, trash.size, trash.size);
    pop();
  }
  
  function overlapCheckFish() {
    image(imgWhale,pointerX,pointerY, whale.size, whale.size);

    // over lap for the fishes from the whale
    for (let fish of school) {
       let s1 = dist(pointerX, pointerY, fish.x, fish.y);
       if (s1 < whale.size / 2 + fish.size / 2) {
         for (let f = 0; f < school.length; f++) {
           let fish = school[f];
           let d = dist(pointerX, pointerY, fish.x, fish.y);
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
      let g1 = dist(pointerX, pointerY, trash.x, trash.y);
      if (g1 < whale.size / 2 + trash.size / 2) {
        state = "loss";
      }
    }
  }
  
 

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
  for (let i = 0; i < hands.length; i += 1) {
    const hand = hands[i];
    for (let j = 0; j < hand.landmarks.length; j += 1) {
      const keypoint = hand.landmarks[j];
      fill(0, 255, 0);
      noStroke();
if (j == 8) {
    pointerX = keypoint[0];
    pointerY = keypoint[1];
    // print(keyTest)
} else 
if(j == 14) {
    knuckle = keypoint[1];
} else
 if (j == 16 ){
    ring = keypoint[1];
 }
    }
}
}
// keypoint[0], keypoint[1],