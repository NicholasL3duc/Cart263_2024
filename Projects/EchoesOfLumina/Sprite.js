class Sprite {
    // to configure the frames per sprites (change from 2 to 4 for later sprites);
    constructor(config){
 // setting up the sprite images;
    // every image passing through the config;
 
    this.image = new Image();
    this.image.src = config.src;
    // set up for image handler
    this.image.onload = () => {
          // wont draw unless this is set to true (look more into this nick);
      this.isLoaded = true;
    }

    //Shadow
    this.shadow = new Image();
    this.useShadow = true; //config.useShadow || false;
    if (this.useShadow) {
      this.shadow.src = "assets/images/characters/shadow.png";
    }
    this.shadow.onload = () => {
      this.isShadowLoaded = true;
    }
 // config for the animataion/ initial state
// frame animation settings
    this.animations = config.animations || {
      "idle-down": [ [0,0] ],
      "idle-right": [ [0,1] ],
      "idle-up": [ [0,2] ],
      "idle-left": [ [0,3] ],
      // Walk frame (based on my spreed sheet) NOTE: adjust height 
      "walk-down": [ [1,0],[0,0], [3,0], [0,0],  ],
      "walk-right": [ [1,1],[0,1], [3,1], [0,1],  ],
      "walk-up": [ [1,2],[0,2], [3,2], [0,2],  ],
      "walk-left": [ [1,3],[0,3], [3,3], [0,3],  ],
    }
    this.currentAnimation = "idle-down"//config.currentAnimation || "idle-down";
    this.currentAnimationFrame = 0;
// amount of frames (less goes quicker) reddit says 16 is basic
this.animationFrameLimit = config.animationFrameLimit || 6;
this.animationFrameProgress = this.animationFrameLimit;

  // game object reference 
    this.gameObject = config.gameObject;
  }

  get frame(){
    return this.animations[this.currentAnimation][this.currentAnimationFrame]
  }

  setAnimation(key){
    if (this.currentAnimation !== key) {
      this.currentAnimation = key;
      this.currentAnimationFrame = 0;
      // caddence counter
      this.animationFrameProgress = this.animationFrameLimit;
    }
  }

updateAnimationProgress(){
// frame tick 
if (this.animationFrameProgress > 0) {
  this.animationFrameProgress -= 1;
  return;
}
// reset tick
this.animationFrameProgress = this.animationFrameLimit;
this.currentAnimationFrame += 1;

if(this.frame === undefined){
  this.currentAnimationFrame = 0;
}

}

  draw(ctx, cameraPerson) {
    const x = this.gameObject.x - 8 + utils.withGrid(10.5) - cameraPerson.x;
    const y = this.gameObject.y - 18 + utils.withGrid(6) - cameraPerson.y;

    this.isShadowLoaded && ctx.drawImage(this.shadow, x, y);

    const [frameX, frameY] = this.frame;

 // size of the cut sprite
    this.isLoaded && ctx.drawImage(this.image,
      frameX * 32, frameY * 32,
      32,32,
      // position of sprite (change this later for different sprite sheet) also shadow x,y
      x,y,
      32,32
    )


    this.updateAnimationProgress();

  }

}

