
/**
 * Title of Project
 * Author Name
 * 
 * This is a template. You must fill in the title, author, 
 * and this description to match your project!
 */

"use strict";
class Animation extends State {
// velocity.
constructor() {
    // We should always call the superclass constructor
    // even if it doesn't do anything right now. It might
    // later!
    super();
/**
 * Description of preload
*/
this.krab = {
    x: 20,
    y: 20,
    w: 30,
    h: 10,
    size: 80,
    vx: 0,
    vy: 0,
    speed: 3.5,
  };
this.imgBridge;
this.imgKrab;
this.imgTroll;

// speech settings
this.mySpeechRec = new p5.SpeechRec(); // speech recognition object (will prompt for mic access)
this.mySpeechRec.onResult = this.showResult; // bind callback function to trcwhen speech is recognized
this.mySpeechRec.continuous = true
this.mySpeechRec.interimResults = true
this.mySpeechRec.start(); // start listening
}
// preload() {
//     imgBridge = loadImage("assets/images/bridge.png");
//     imgKrab = loadImage("assets/images/Krab.png")
//     imgTroll = loadImage("assets/images/Sleeping.png")
// }
showResult(){
    console.log(mySpeechRec.resultString); // log the result
  }
  

/**
 * Description of setup
*/
setup() {
    createCanvas(1400, 850);

}


/**
 * Description of draw()
*/
draw() {
    background(imgBridge);
    this.krab.x += this.krab.vx;
    this.krab.y += this.krab.vy;
  
  }

    
        // updating the x and y of the Krab
  

 simulation(){
controlUser();
display();
questions();
restartRec();
gamestart();

}

controlUser(){
    if (keyIsDown(87)) {
        //moving using the W key
        this.krab.vy = -this.krab.speed;
      } else if (keyIsDown(83)) {
        //moving using the W key
        this.krab.vy = this.krab.speed;
      } else {
        this.krab.vy = 0;
      }
    
      if (keyIsDown(68)) {
        this.krab.vx = this.krab.speed;
      } else if (keyIsDown(65)) {
        this.krab.vx = -this.krab.speed;
      } else {
        this.krab.vx = 0;
      }
      this.krab.x += this.krab.vx;
      this.krab.y += this.krab.vy;

}
display() {
    //   // krab display
  
    // display for krab
    push();
    image(imgKrab, this.krab.x, this.krab.y, this.krab.size, this.krab.size);
    pop();
    // display for sleeping troll
    push();
    image(imgTroll,550,500,100,100)
}

gamestart(){
if(this.krab.y > 500){
    state === "question1"

    
}


}
questions() {

    // apperently important to turn everything lowercase
    this.lowerStr = "";
    if(mySpeechRec.resultString) {
        lowerStr= mySpeechRec.resultString.toLowerCase();
    }
  
    this.mostRecentWord = lowerStr.split(" ").pop();
  
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
  
restartRec() {
    // mySpeechRec.start();
  }
}