
/**
 * Title of Project
 * Author Name
 * 
 * This is a template. You must fill in the title, author, 
 * and this description to match your project!
 */

"use strict";

/**
 * Description of preload
*/
let krab = {
    x: 20,
    y: 20,
    w: 30,
    h: 10,
    size: 80,
    vx: 0,
    vy: 0,
    speed: 3.5,
  };
  let state = "titleCutScene"
let imgBridge;
let imgKrab;
let imgTroll;

// speech settings
let mySpeechRec = new p5.SpeechRec(); // speech recognition object (will prompt for mic access)
mySpeechRec.onResult = showResult; // bind callback function to trcwhen speech is recognized
mySpeechRec.continuous = true
mySpeechRec.interimResults = true
mySpeechRec.start(); // start listening

function preload() {
    imgBridge = loadImage("assets/images/bridge.png");
    imgKrab = loadImage("assets/images/Krab.png")
    imgTroll = loadImage("assets/images/Sleeping.png")
}
function showResult(){
    console.log(mySpeechRec.resultString); // log the result
  }
  

/**
 * Description of setup
*/
function setup() {
    createCanvas(1400, 850);

}


/**
 * Description of draw()
*/
function draw() {
    background(imgBridge);

    if (state === "titleCutScreen") {
      title();
    } else if (state === "Question1") {
      simulation();
    } else if (state === "Question2") {
      stage2();
    } else if (state === "Question3") {
      stage3();
    } else if (state === "win") {
      win();
    } else if (state === "loss") {
      loss();
    }
  }

    
        // updating the x and y of the Krab
  krab.x += krab.vx;
  krab.y += krab.vy;


function simulation(){
controlUser();
display();
questions();
restartRec();
gamestart();
}

function controlUser(){
    if (keyIsDown(87)) {
        //moving using the W key
        krab.vy = -krab.speed;
      } else if (keyIsDown(83)) {
        //moving using the W key
        krab.vy = krab.speed;
      } else {
        krab.vy = 0;
      }
    
      if (keyIsDown(68)) {
        krab.vx = krab.speed;
      } else if (keyIsDown(65)) {
        krab.vx = -krab.speed;
      } else {
        krab.vx = 0;
      }
      krab.x += krab.vx;
      krab.y += krab.vy;

}
function display() {
    //   // krab display
  
    // display for krab
    push();
    image(imgKrab, krab.x, krab.y, krab.size, krab.size);
    pop();
    // display for sleeping troll
    push();
    image(imgTroll,550,500,100,100)
}

function gamestart(){
if(krab.y > 500){
    state === "question1"

    
}


}
function questions() {

    // apperently important to turn everything lowercase
    let lowerStr = "";
    if(mySpeechRec.resultString) {
        lowerStr= mySpeechRec.resultString.toLowerCase();
    }
  
    let mostRecentWord = lowerStr.split(" ").pop();
  
    if (mostRecentWord == "apples") {
 
    }
    if (mostRecentWord == "banana") {
    
    }
    if (mostRecentWord == "Jellyfishes") {

    }
    if (mostRecentWord == "AA Batteries") {

    }
    if (mostRecentWord == "The New York Yankes") {
   
    }
  }
  
  function restartRec() {
    // mySpeechRec.start();
  }
    