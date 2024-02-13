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
class Question1After extends State {
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
    this.question1 = {
        x: 700,
        y: 470,
        w: 550,
        h: 150,
        size: 120,

        active: true,
      };
    //   krab speed
    this.krab.vx = this.krab.speed;

// typewriter function
    this.typewriter = new Typewriter();
    
this.typewriter.typewrite(

  `HOW DID YOU KNOW????
  \n Nevermind, ready for the next one? `,

  windowWidth - 670,
  windowHeight / 1.4
  
);
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
        this.question();
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


//   typewriter
question(){
    push();

    image(
    imgText,
      this.question1.x,
      this.question1.y,
    //   this.question1.size,
      this.question1.w,
      this.question1.h
    );
    this.typewriter.display();
    pop();


// this.typewriter = new Typewriter();
// this.typewriter.typewrite(
//   `what is the number 2 added to the number 4= ?? 
//   \n A) Seashell , B) Red,  C)6`,

//   windowWidth - 920,
//   windowHeight / 2.2
// );
// 

}

    // display()
    // Displays the this.krab as an ellipse on the canvas
    display() {
        // display for krab
    push();
    image(imgkrab, this.krab.x, this.krab.y, this.krab.size, this.krab.size);
    pop();
    push();
    image(imgAlertTroll, this.troll.x, this.troll.y, this.troll.size, this.troll.size);
    pop();

    }
gameStarter(){
    let lowerStr = "";
    if(mySpeechRec.resultString) {
        lowerStr= mySpeechRec.resultString.toLowerCase();
    }
  
    let mostRecentWord = lowerStr.split(" ").pop();
    if (mostRecentWord == "yes") {
        currentState = new Question2(); //if mouse clicks over choice 1 bad ending
    }
    if (mostRecentWord == "sure") {
        currentState = new Question2(); //if mouse clicks over choice 1 bad ending
    }

}
}