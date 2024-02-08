class transitions extends State {

    constructor() {
        //variables for the transitions
this.titleFade = 255;
this.sinstFade = 0;
this.fadeOn = true;
this.fadeTransition = 255;



    //drawing the title and first instruction
    fill(255,titleFade);
    noStroke();
    textSize(200);
    textAlign(CENTER,CENTER);
    text('title',width/2,height/3);
    textSize(80);
    text('press space to begin',width/2,height/3*2);
    
    // starts sprite animation with spacebar pressed
    if (marsBkg.frame < 2 && kb.presses('space')) {
            marsBkg.play();
        }
    // alpha value of the title is mapped by the animation frames
    titleFade = map(marsBkg.frame,1,8,255,0);
    
    // controls the fade of the title
    if (titleFade === 0) {
        instFade += 10;
    }
    
    // draws the instructions with text and rectangles
    stroke(255,instFade);
    strokeWeight(10);
}
}