class DirectionInput {
constructor(){
    this.heldDirections = [];

    this.map = {
        // go up
        "ArrowUp" : "up",
        "KeyW" : "up",
        // go down
        "ArrowDown" : "down",
        "KeyS" : "down",
        // go left
        "ArrowLeft" : "left",
        "KeyA" : "left",
        // go right
        "ArrowRight" : "right",
        "KeyD" : "right",

    }

}

get direction() {
    return this.heldDirections[0];
}

init(){
document.addEventListener("keydown", e => {
    // console.log(e.code)
    const dir = this.map[e.code]
    if (dir && this.heldDirections.indexOf(dir) === -1) {
        this.heldDirections.unshift(dir);
        // for things going into the Array
    }
});
// event lisener for when things go out of the array
document.addEventListener("keyup",  e => {
    const dir = this.map[e.code];
    const index = this.heldDirections.indexOf(dir);
    if (index > -1) {
        this.heldDirections.splice(index, 1);
      
    }

})

}


}