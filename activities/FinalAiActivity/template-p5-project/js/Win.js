// GoodEnding
// Displays the GoodEnding message of the program.
class win {
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
      textSize(64);
      fill(255, 150, 150);
      textAlign(CENTER, CENTER);
      text("Yummy!", width / 2, height / 2);
      text("You Won, Congrats", width / 2, height / 1.5);
      image(imghappy, 600, 50, 200, 200);
      pop();


    
    }



}

  
  