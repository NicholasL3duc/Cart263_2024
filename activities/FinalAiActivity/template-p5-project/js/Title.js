class Title extends State {

  
    draw() {
      // Always call the super() version of the method if there is one
      // just in case it does something important.
      super.draw();

//    will change this to a drawn image 
    createCanvas(windowWidth,windowHeight);
    // this.music()
      background(imgTitleGif,1300,800);
    // this.StartGame();
    this.keyPressed();

 
     
    }
    // music(){
    //     push();
    
    //     if(TitleMusicOn == false){
    //     TitleMusic.play();
    //     TitleMusic.setVolume(0.1)
    //     userStartAudio
    //     TitleMusic.loop()
    //     console.log("playmusic")
    //     TitleMusicOn = true
    //     }
        
    //     pop();
// }
   keyPressed() {
    if (keyCode === 32) {
            currentState = new Animation();
            }
          }
          
}
