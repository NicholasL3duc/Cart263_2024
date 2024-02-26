// GoodEnding
// Displays the GoodEnding message of the program.
class loss {
    // constructor()
    // Acts as the setup() of the state, called when the
    // state is created. Sets the GoodEnding message of the program.
    constructor() {
      // Set our property determining the GoodEnding message of the simulation
   
    }
  
    // draw()
    // Called every frame in the main script. Handles what the GoodEnding
    // state needs to do each frame, which is display the GoodEnding message.
    draw() {
      background(imgGoodEnding);
  
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



}

  
  