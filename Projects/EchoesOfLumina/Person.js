// moving objects/ character
class Person extends GameObject {
    constructor(config){
        // grid based moving (aka: move until you reach that point)
        super(config);
        this.movingProgressRemaining = 0;

        this.isPlayerControlled = config.isPlayerControlled || false;


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
        this.updateSprite(state);
        if (this.movingProgressRemaining === 0 && state.arrow) {
            this.direction = state.arrow;
            console.log (state.map.isSpaceTaken(this.x, this.y, this.direction));
            this.movingProgressRemaining = 16;

        }
    }

    updatePosition(){
        if(this.isPlayerControlled && this.movingProgressRemaining > 0 ){
        const [property, change] = this.directionUpdate[this.direction];
        this[property] += change;
        this.movingProgressRemaining -= 1;
    }


}

updateSprite(state){

 if (this.isPlayerControlled && this.movingProgressRemaining === 0 && !state.arrow) {
    this.sprite.setAnimation("idle-"+this.direction);
    return;
    }

if (this.movingProgressRemaining > 0) {
    this.sprite.setAnimation("walk-"+this.direction);

}

}

}