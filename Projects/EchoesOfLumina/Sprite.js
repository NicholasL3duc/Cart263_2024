class Sprite {
    // to configure the frames per sprites (change from 2 to 4 for later sprites)
    constructor(config){

        // setting up the sprite images
        // every image passing through the config
this.image = new Image();
this.image.src = config.src
// set up for image handler
this.image.onload = () => {
    // wont draw unless this is set to true (look more into this nick)
    this.isLoaded = true;
}
        // config for the animataion/ initial state
        this.animations = config.animations || {
            // array for each frame ( going horizontaly or how ever you spell it)
            idleDown: [
                [0,0]
            ],
            walkDown: [
            [0,0],[1,0],[2,0],[3,0],
            ]
        }
        this.currentAnimation = config.currentAnimation || "idleDown";
        this.currentAnimationFrame = 0;

        // game object reference 
        this.gameObject = config.gameObject;
    }

    draw(ctx){
        const x = this.gameObject.x * 16 - 8;
        const y = this.gameObject.y * 16 - 18;

        this.isLoaded && ctx.drawImage(this.image,
            // size of the cut sprite
            0,0,
            32,32,
            // position of sprite (change this later for different sprite sheet)
            x,y,
            32,32,
            )
    }
}