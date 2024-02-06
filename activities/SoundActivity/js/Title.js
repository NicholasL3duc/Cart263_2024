
class Title extends State {

  
    // state is created. Sets the title of the program.
    constructor() {
      // We should always call the superclass constructor
  
      super();
  
      // Set our property determining the title of the simulation
    //   this.titleString = "Get Your Kids Back From The Evil Octopus!!";
    }
  
    // draw()
    
    draw() {
      // Always call the super() version of the method if there is one
      // just in case it does something important.
      super.draw();
  this.keyPressed();
//    will change this to a drawn image 
      background(imgTitleGif,0,0,width,height);
  
    
      // the actual title text. More methods/functions is generally better.
    //   this.displayTitle();
    }
  
    // displayTitle()
   
    // displayTitle() {
    //   push();
    //   image(imgTitleGif,0,0,width,height);
    //   pop();
    // }
  
    
    keyPressed() {
    
      super.keyPressed();
  
      currentState = new Question1();
    }
  }