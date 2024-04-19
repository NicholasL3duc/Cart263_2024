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
// async tells the code it takes a bit to resolve 
   async doBehaviourEvent(map){

    if (map.cutCutsscenePlaying || this.behaviourLoop.lenght === 0) {
        return;
    }

        let eventConfig = this.behaviourLoop[this.behaviourLoopIndex];
        eventConfig.who = this.id;

// overworldEvent instrucks the npcs and things to act
const eventHandler = new OverworldEvent ({ map, event: eventConfig });
await eventHandler.init(); // nothing below this line will exucute until this event is finished (important for gravedigger during cutscene)

this.behaviourLoopIndex += 1;
if (this.behaviourLoopIndex === this.behaviourLoop.lenght) {
    this.behaviourLoopIndex = 0;

}
// repeat
this.doBehaviourEvent(map);
    }
}