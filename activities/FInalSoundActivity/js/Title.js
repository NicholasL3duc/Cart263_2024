class Title extends State {

  
    draw() {
      // Always call the super() version of the method if there is one
      // just in case it does something important.
      super.draw();

//    will change this to a drawn image 
    createCanvas(windowWidth,windowHeight);
    this.music()
      background(imgTitleGif,1300,800);
    this.StartGame();

 
     
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
    StartGame(){
        let lowerStr = "";
        if(mySpeechRec.resultString) {
            lowerStr= mySpeechRec.resultString.toLowerCase();
        }
      
        let mostRecentWord = lowerStr.split(" ").pop();
      
        if (mostRecentWord == "start") {
       
      currentState = new Animation();
      TitleMusic.stop();
      
        }

    }

    // keyPressed() {
    
    //   super.keyPressed();
  
    //   currentState = new Animation();
    // TitleMusic.stop();
    

    //add voices for troll
    //}
  }