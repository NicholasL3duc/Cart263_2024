class Title extends State {

  
    draw() {
      // Always call the super() version of the method if there is one
      // just in case it does something important.
      super.draw();

//    will change this to a drawn image 
    createCanvas(windowWidth,windowHeight);
      background(imgTitleGif,1300,800);

      this.music()
     
    }
    music(){
        push();
    
        if(TitleMusicOn == false){
        TitleMusic.play();
        TitleMusic.setVolume(0.1)
        userStartAudio
        TitleMusic.loop()
        console.log("playmusic")
        TitleMusicOn = true
        }
        
        pop();
        }
    
    keyPressed() {
    
      super.keyPressed();
  
      currentState = new Animation();
    TitleMusic.stop();
    

    //add voices for troll
    }
  }