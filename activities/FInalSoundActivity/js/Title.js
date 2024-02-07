class Title extends State {

  
    draw() {
      // Always call the super() version of the method if there is one
      // just in case it does something important.
      super.draw();

//    will change this to a drawn image 
        createCanvas(720, 720);
      background(imgTitleGif);
  
    }

    
    keyPressed() {
    
      super.keyPressed();
  
      currentState = new Animation();
    }
  }