// A variable to store the currently active state object (starts empty)
let currentState;



function showResult(){
    console.log(mySpeechRec.resultString); // log the result
  }
// setup()
// Create the canvas, start our program in the title state, set default text style
function setup() {



  
  // We can set the current state by creating a NEW object from the class
  // representing that state! This will call its constructor() which will work
  // like the `setup()` for that state.
  currentState = new Example(); // REVERT TO TITLE AFTER

  
}

// draw()
// Simply call the draw method of the current state

// keyPressed()
// Call the keyPressed method of the current state
// Note how even if the specific state itself DOESN'T define a keyPressed() method this
// will work because they all extend the State class which does have one. For instance
// // neither Animation nor Ending define a keyPressed() method, but this still works
// // because they INHERIT the one from the State class.
// function keyPressed() {
//   // If the current state is Title this will call the Title class keyPressed()
//   // If the current state is Animation this will call the State class keyPressed()
//   // if the current state is Ending this will call the State class keyPressed()
// currentState.keyPressed();
// }