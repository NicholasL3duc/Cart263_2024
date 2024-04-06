class GameObject {
    // how many values AKA props/objects
    constructor(config,){
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.direction = config.direction || "down";
        // different apperance for sprits 
        this.sprite = new Sprite({
            gameObject : this,
            src: config.src || "assets/images/characters/people/hero.png"
        })
    }

mount(map) {
    console.log("mount check")
    this.isMounted = true;
    map.addWall(this.x, this.y)
}


    update(){


    }
}