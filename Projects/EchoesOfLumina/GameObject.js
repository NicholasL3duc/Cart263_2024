class GameObject {
    // how many values AKA props/objects
    constructor(config,){
        this.id = null;
        this.isMounted = false;
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.direction = config.direction || "down";
        // different apperance for sprits 
        this.sprite = new Sprite({
            gameObject : this,
            src: config.src || "assets/images/characters/people/hero.png"
        })
//  if pass through then start if not then die
        this.behaviourLoop = config.behaviourLoop || [];
        this.behaviourLoopIndex = 0;

    }

mount(map) {
    console.log("mount check")
    this.isMounted = true;
    map.addWall(this.x, this.y)

    // if behaviour exist, start late

    setTimeout(() => {
        this.doBehaviourEvent(map);
    }, 10)

}


    update(){


    }

    doBehaviourEvent(map){

        let event = this.behaviourLoop[this.behaviourLoopIndex];
    }
}