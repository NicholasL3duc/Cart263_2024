class transitions extends State {

    constructor() {
            // We should always call the superclass constructor
            // even if it doesn't do anything right now. It might
            // later!
            super();
        //variables for the transitions
this.titleFade = 255;
this.instFade = 0;
this.fadeOn = true;
this.fadeTransition = 255;



    // //drawing the title and first instruction
    // fill(255,this.titleFade);
    // noStroke();
    // textSize(200);
    // textAlign(CENTER,CENTER);
    // text('title',width/2,height/3);
    // textSize(80);
    // text('press space to begin',width/2,height/3*2);
    
    // starts sprite animation with spacebar pressed
    if (Animation.frame < 2 && kb.presses('space')) {
            Animation.play();
        }
    // alpha value of the title is mapped by the animation frames
    this.titleFade = map(Animation.frame,1,8,255,0);
    
    // controls the fade of the title
    if (this.titleFade === 0) {
        this.instFade += 10;
    }
    
    // draws the instructions with text and rectangles
    stroke(255,this.instFade);
    strokeWeight(10);
}
}