class GameObject {
  constructor(config) {
     // how many values AKA props/objects
    this.id = null;
    this.isMounted = false;
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.direction = config.direction || "down";
        // different apperance for sprits 
    this.sprite = new Sprite({
      gameObject: this,
      src: config.src || "assets/images/characters/people/hero.png",
    });

    //These happen once on map startup.
//  if pass through then start if not then die
    this.behaviorLoop = config.behaviorLoop || [];
    this.behaviorLoopIndex = 0;
    this.talking = config.talking || [];
  }

  mount(map) {
    this.isMounted = true;
    map.addWall(this.x, this.y);

    // if behavior exist, start late
    setTimeout(() => {
      this.doBehaviorEvent(map);
    }, 10)
  }

  update() {
  }
// async tells the code it takes a bit to resolve 
  async doBehaviorEvent(map) { 

  // this keeps everting frozen while playing
    if (map.isCutscenePlaying || this.behaviorLoop.length === 0 || this.isStanding) {
      return;
    }

    // info on events
    let eventConfig = this.behaviorLoop[this.behaviorLoopIndex];
    eventConfig.who = this.id;

    //Create an event instance out of our next event config
    const eventHandler = new OverworldEvent({ map, event: eventConfig });
    await eventHandler.init(); 

    //creating the next event
    this.behaviorLoopIndex += 1;
    if (this.behaviorLoopIndex === this.behaviorLoop.length) {
      this.behaviorLoopIndex = 0;
    } 

    //back at it again
    this.doBehaviorEvent(map);
    

  }


}