class GameObject {
    // how many values AKA props/objects
    constructor(config,){
        this.x = config.x || 0;
        this.y = config.y || 0;
        // different apperance for sprits 
        this.sprite = null;
    }
}