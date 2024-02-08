
// Handles the actual animation sequence of the program. A this.krab
// moves from left to right across the screen. When it reaches the right
// side the program will switch to the Ending state.

// NOTE: We extend the State class to guarantee this class will have
// the key methods that we call in the main program,
// draw() and keyPressed() in this case.

// NOTE: Even though at the moment Animation does *not* define a keyPressed()
// method, the fact it extends State means it *does* have one when it is called
// in the main program. This is a key benefit of extending State.
class Animation extends State {
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
        y: 20,
        size: 80,
        vx: 0,
        vy: 0,
        speed: 3.5, //3.5 set it back
      }
      this.troll = {
        x: 620,
        y: 620,
        size: 90,
        vx: 0,
        vy: 0,

    }
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
      this.move();
      this.display();
      this.gameStarter();
      this.music()
    }
  
    // move()
    // Updates the krab's position with its velocity
    move() {
      if (keyIsDown(38)) {
        //moving using the up arrow key
        this.krab.vy = -this.krab.speed;
      } else if (keyIsDown(40)) {
        //moving using the down arrow key
        this.krab.vy = this.krab.speed;
      } else {
        this.krab.vy = 0;
      }
  
      if (keyIsDown(39)) {
        // moving using the right arrow key
        this.krab.vx = this.krab.speed;
      } else if (keyIsDown(37)) {
        // moving using the left arrow key
        this.krab.vx = -this.krab.speed;
      } else {
        this.krab.vx = 0;
      }
      this.krab.x += this.krab.vx;
      this.krab.y += this.krab.vy;
    }
  
    // display()
    // Displays the this.krab as an ellipse on the canvas
    display() {
        // display for krab
    push();
    image(imgkrab, this.krab.x, this.krab.y, this.krab.size, this.krab.size);
    pop();
    push();
    image(imgSleepingTroll, this.troll.x, this.troll.y, this.troll.size, this.troll.size);
    pop();

    
    }
music(){
push();
// backgroundForest.play();
// backgroundForest.setVolume(0.3)
// userStartAudio
// backgroundForest.loop()
// console.log("playmusic")

if(backgroundForestOn == false){
    backgroundForest.play();
backgroundForest.setVolume(0.3)
userStartAudio
backgroundForest.loop()
console.log("playmusic")
backgroundForestOn = true
}

pop();
}
    gameStarter(){
        if(this.krab.y > 500){
            state === "Start"
        backgroundForest.stop();
     
        }
    }
}