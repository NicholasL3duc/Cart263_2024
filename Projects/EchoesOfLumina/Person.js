// moving objects/ character
class Person extends GameObject {
    constructor(config){
        // grid based moving (aka: move until you reach that point)
        super(config);
        this.movingProgressRemaining = 32;



        
// movement Settings 
        this.directionUpdate = {
            "up": ["y", -1],
            "down": ["y", 1],
            "left": ["x", -1],
            "right": ["x", 1],
        }
// array for the movement above
    }
    update(state){
        this.updatePosition();
    }

    updatePosition(){
        if(this.movingProgressRemaining > 0 ){
        const [property, change] = this.directionUpdate[this.direction];
        this[property] += change;
        this.movingProgressRemaining -= 1;
    }


}
}