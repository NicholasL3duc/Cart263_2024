// moving objects/ character

class Person extends GameObject {
    constructor(config) {
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
    }
  // array for the movement above
  
    update(state) {
      if (this.movingProgressRemaining > 0) {
        this.updatePosition();
      } else {
  
              // arrow pressed when needed (no movement in cut scenes)
  
        if (!state.map.isCutscenePlaying && this.isPlayerControlled && state.arrow) {
          this.startBehavior(state, {
            type: "walk",
            direction: state.arrow
          })
        }
        this.updateSprite(state);
      }
    }
      //  this is to avoid the monster from getting stuck
  
    startBehavior(state, behavior) {
      this.direction = behavior.direction;
              // check if walk
  
      if (behavior.type === "walk") {
        //Stop here if space is not free
        if (state.map.isSpaceTaken(this.x, this.y, this.direction)) {
  
          behavior.retry && setTimeout(() => {
            this.startBehavior(state, behavior)
          }, 10);
  
          return;
        }
  
        //Ready to walk!
        state.map.moveWall(this.x, this.y, this.direction);
        this.movingProgressRemaining = 16;
        this.updateSprite(state);
      }
  
      if (behavior.type === "stand") {
        setTimeout(() => {
          utils.emitEvent("PersonStandComplete", {
            whoId: this.id
          })
        }, behavior.time)
      }
  
    }
  
    updatePosition() {
        const [property, change] = this.directionUpdate[this.direction];
        this[property] += change;
        this.movingProgressRemaining -= 1;
  
        if (this.movingProgressRemaining === 0) {
  // //  when 0, walk done
            utils.emitEvent("PersonWalkingComplete", {
            whoId: this.id
          })
  
        }
    }
  
    updateSprite() {
      if (this.movingProgressRemaining > 0) {
        this.sprite.setAnimation("walk-"+this.direction);
        return;
      }
      this.sprite.setAnimation("idle-"+this.direction);    
    }
  
  }