// A variable to store the currently active state object (starts empty)
let currentState;

// the images used

let imgTitleGif;
let imgEnding;
let imgGoodEnding;
let imgkrab;
let imgBridge;

// troll images
let imgSleepingTroll;
let imgAlertTroll;
let imgStopTroll;
let imgDefeatedTroll;
let imgAwakeTroll;

// sounds/ music
let backgroundForest;
let TitleMusic;

function preload() {

    imgTitleGif = loadImage("assets/images/Krab Title gif.gif")
    imgkrab = loadImage("assets/images/Krab.png");
   imgBridge = loadImage("assets/images/bridge.png")
   imgSleepingTroll = loadImage("assets/images/SleepingTroll-removebg-preview.png")
   imgAlertTroll = loadImage("assets/images/alert_troll-removebg-preview.png")
   imgDefeatedTroll = loadImage("assets/images/defeatedTroll-removebg-preview.png")
   imgStopTroll = loadImage("assets/images/stopTroll-removebg-preview.png")
   imgAwakeTroll = loadImage("assets/images/awakeTroll-removebg-preview.png")

   //music
   backgroundForest = loadSound('assets/sounds/Pokemon- Mystery Dungeon Explorers of Sky- Apple Woods- Music [TubeRipper.com] (1).mp3')
    TitleMusic = loadSound('assets/sounds/Pokémon Red & Blue Music_ Opening Theme (1).mp3')
}

// setup()
// Create the canvas, start our program in the title state, set default text style
function setup() {
  createCanvas(1400, 850);


  
  // We can set the current state by creating a NEW object from the class
  // representing that state! This will call its constructor() which will work
  // like the `setup()` for that state.
  currentState = new Title(); // REVERT TO TITLE AFTER

  // Text settings
  textSize(50);
  textAlign(CENTER, CENTER);
}

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
