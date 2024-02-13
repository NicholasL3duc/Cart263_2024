// Animation
// Handles the actual animation sequence of the program. A this.krab
// moves from left to right across the screen. When it reaches the right
// side the program will switch to the Ending state.

// NOTE: We extend the State class to guarantee this class will have
// the key methods that we call in the main program,
// draw() and keyPressed() in this case.

// NOTE: Even though at the moment Animation does *not* define a keyPressed()
// method, the fact it extends State means it *does* have one when it is called
// in the main program. This is a key benefit of extending State.
class BeforeEnding extends State {
    // Acts as the setup() of the state, called when the
    // state is created. Creates a this.krab object and sets its
    // velocity.
    constructor() {
      // We should always call the superclass constructor
      // even if it doesn't do anything right now. It might
      // later!
      super();
      // Krab object
      this.krab = {
        x: 650,
        y: 400,
        size: 80,
        vx: 0,
        vy: 0,
        speed: 3.5, //3.5 set it back
      }

      this.troll = {
        x: 650,
        y: 570,
        size: 90,
        vx: 0,
        vy: 0,

    
        }

    //   krab speed
    this.krab.vx = this.krab.speed;

}
    // draw()
    // Called every frame in the main script. Handles what the title
    // state needs to do each frame. It moves and displays the krab
    // and checks if it has reached the right hand side.
    draw() {
      // Always call the super() version of the method if there is one
      // just in case it does something important.
      super.draw();
  
      background(imgBridge);
  
      // Call the state's methods to make the animation work
    //   this.questions();
      this.display();
      this.gameStarter();
      this.music();
   
        this.move();
    }
music(){

// sounds
if(dialogueOn == true){
    dialogue.play();
    dialogue.setVolume(0.1)
    userStartAudio
    console.log("playsound")
    dialogueOn = false
    
}
}
move() {
     
    // apperently important to turn everything lowercase
    let lowerStr = "";
    if(mySpeechRec.resultString) {
        lowerStr= mySpeechRec.resultString.toLowerCase();
    }
   
    let mostRecentWord = lowerStr.split(" ").pop();
  
    if (mostRecentWord == "stop") {
     this.krab.vx = 0;
     this.krab.vy = 0;
    }
    if (mostRecentWord == "up") {
        this.krab.vx = 0;
     this.krab.vy = -2;
    }
    if (mostRecentWord == "down") {
     this.krab.vx = 0;
     this.krab.vy = 2;
    //  console.log("TestDOWN")
    }
    if (mostRecentWord == "left") {
     this.krab.vx = -2;
     this.krab.vy = 0;
    }
    if (mostRecentWord == "right") {
     this.krab.vx = 2;
     this.krab.vy = 0;
    }
    }

    // display()
    // Displays the this.krab as an ellipse on the canvas
    display() {
        // display for krab
    push();
    image(imgkrab, this.krab.x, this.krab.y, this.krab.size, this.krab.size);
    pop();
    push();
    image(imgDefeatedTroll, this.troll.x, this.troll.y, this.troll.size, this.troll.size);
    pop();

    }
gameStarter(){
    if(this.krab.y > 840){
        this.krab.vx = 0;
        this.krab.vy = 0;

        currentState = new GoodEnding();
        // }
}
}
}