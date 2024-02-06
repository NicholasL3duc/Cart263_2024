
class TitleCutScene extends class {

  
    // state is created. Sets the title of the program.
    constructor() {
      // We should always call the superclass constructor
  
    //   super();
  
      // Set our property determining the title of the simulation
     
    }
  
    // draw()
    
    draw() {
      // Always call the super() version of the method if there is one
      // just in case it does something important.
      super.draw();
  
//    will change this to a drawn image 
      background();
  
    
      // the actual title text. More methods/functions is generally better.
      this.displayTitle();
    }
  
    // displayTitle()
   
    displayTitle() {
        push();
            image(imgTitleScene,0,0,width,height)
        pop();
    }
  
    
    keyPressed() {
    
      super.keyPressed();
  
      currentState = new Animation();
    }
}
