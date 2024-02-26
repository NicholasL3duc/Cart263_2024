// A variable to store the currently active state object (starts empty)
let currentState;
/**
Description of preload
*/


// the images into let
let imgTitleGif;
let imgWhale;
let imgTrash;
let imgFish;
let imgDead;
let imghappy;

// the arrays used
let school = [];
let garbage = [];

function preload() {
    imgTitleGif = loadImage("assets/images/imgTitleGif.gif")
    imgWhale = loadImage(`assets/images/whale.png`);
    imgTrash = loadImage(`assets/images/trash.png`);
    imgFish = loadImage(`assets/images/fish.webp`);
    imgDead = loadImage(`assets/images/deadWhale.webp`);
    imghappy = loadImage(`assets/images/happy.webp`);
}


/**
Description of setup
*/
function setup() {
    createCanvas(1400, 850);


  
    // We can set the current state by creating a NEW object from the class
    // representing that state! This will call its constructor() which will work
    // like the `setup()` for that state.
    // currentState = new Title(); // REVERT TO TITLE AFTER
    currentState = new Title(); // REVERT TO TITLE AFTER
    // Text settings
    textSize(50);
    textAlign(CENTER, CENTER);
}


/**
Description of draw()
*/
// draw()
// Simply call the draw method of the current state
function draw() {
    // If the current state is Title this will call the Title class draw()
    // If the current state is Animation this will call the Animation class draw()
    // if the current state is Ending this will call the Ending class draw()
   currentState.draw();
  }
  
  // keyPressed()
  // Call the keyPressed method of the current state
  // Note how even if the specific state itself DOESN'T define a keyPressed() method this
  // will work because they all extend the State class which does have one. For instance
  // neither Animation nor Ending define a keyPressed() method, but this still works
  // because they INHERIT the one from the State class.
  function keyPressed() {
    // If the current state is Title this will call the Title class keyPressed()
    // If the current state is Animation this will call the State class keyPressed()
    // if the current state is Ending this will call the State class keyPressed()
  currentState.keyPressed();
  }