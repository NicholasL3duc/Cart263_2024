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
      "walk-down": [ [1,0],[0,0], [3,0], [0,0],  ],
    }
    this.currentAnimation = "walk-down"//config.currentAnimation || "idle-down";
    this.currentAnimationFrame = 0;
// amount of frames (less goes quicker) reddit says 16 is basic
this.animationFrameLimit = config.animationFrameLimit || 16;
this.animationFrameProgress = this.animationFrameLimit;

  // game object reference 
    this.gameObject = config.gameObject;
  }

  get frame(){
    return this.animations[this.currentAnimation][this.currentAnimationFrame]
  }

  draw(ctx) {
    const x = this.gameObject.x - 8;
    const y = this.gameObject.y - 18;

    this.isShadowLoaded && ctx.drawImage(this.shadow, x, y);

    const [frameX, frameY] = this.frame;

 // size of the cut sprite
    this.isLoaded && ctx.drawImage(this.image,
      frameX * 32, frameY * 32,
      32,32,
      // position of sprite (change this later for different sprite sheet) also shadow x,y
      x,y,
      32,32
    );
  };
};

