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

    this.animations = config.animations || {
      idleDown: [
        [0,0]
      ]
    };
    this.currentAnimation = config.currentAnimation || "idleDown";
    this.currentAnimationFrame = 0;

  // game object reference 
    this.gameObject = config.gameObject;
  };

  draw(ctx) {
    const x = this.gameObject.x * 16 - 8;
    const y = this.gameObject.y * 16 - 18;

    this.isShadowLoaded && ctx.drawImage(this.shadow, x, y);
 // size of the cut sprite
    this.isLoaded && ctx.drawImage(this.image,
      0,0,
      32,32,
      // position of sprite (change this later for different sprite sheet) also shadow x,y
      x,y,
      32,32
    );
  };
};

