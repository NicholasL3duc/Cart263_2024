class GameObject {
    // how many values AKA props/objects

constructor(config) {
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
//  if pass through then start if not then die

  this.behaviorLoop = config.behaviorLoop || [];
  this.behaviorLoopIndex = 0;

}

mount(map) {
  console.log("Mount Check")
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

  //Don't do anything if there is a more important cutscene or I don't have config to do anything
  //anyway.
  if (map.isCutscenePlaying || this.behaviorLoop.length === 0) {
    return;
  }

// overworldEvent instrucks the npcs and things to act
  let eventConfig = this.behaviorLoop[this.behaviorLoopIndex];
  eventConfig.who = this.id;

// overworldEvent instrucks the npcs and things to act
const eventHandler = new OverworldEvent({ map, event: eventConfig });
  await eventHandler.init(); // nothing below this line will exucute until this event is finished (important for gravedigger during cutscene)


  this.behaviorLoopIndex += 1;
  if (this.behaviorLoopIndex === this.behaviorLoop.length) {
    this.behaviorLoopIndex = 0;
  } 

// repeat
  this.doBehaviorEvent(map);
  

}


}