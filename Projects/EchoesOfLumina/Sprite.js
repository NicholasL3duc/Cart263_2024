class Sprite {
    // to configure the frames per sprites (change from 2 to 4 for later sprites)
    constructor(config){
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
    }

}