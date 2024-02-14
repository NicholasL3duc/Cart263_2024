// GoodEnding
// Displays the GoodEnding message of the program.
class GoodEnding {
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
      textSize(90);
      fill(189, 38, 21);
      textAlign(CENTER, CENTER);
      text("YOU WON !!!", width / 2 , height / 5);
      textSize(60);
      text("You are a The Hero", width / 2, height / 3);
      // image(imgGoodEnding, 250, 250, 250, 250);
      pop();


      this.music();
    
    }
  music(){

// sounds
if(EndingMusicOn == false){
    EndingMusic.play();
    EndingMusic.setVolume(0.1)
    userStartAudio
    console.log("playsound")
    EndingMusicOn = true
    
}
}

  }
  