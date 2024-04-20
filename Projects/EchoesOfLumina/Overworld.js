class Overworld {
  constructor(config) {
    this.element = config.element;
       // game screen size (keep small now for better FPS) CHANGE LATER DUMBASS -Nick
    this.canvas = this.element.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.map = null;
  }
 //  recalls this loop every frame
  startGameLoop() {
       // console.log("stepping!"); delete this at when finished debugging
 // drawing the background
    const step = () => {
 
     //Clear off the canvas
     this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    //  camera on Hero
    const cameraPerson = this.map.gameObjects.hero;
 
    Object.values(this.map.gameObjects).forEach(object => {
      object.update({
        arrow: this.directionInput.direction,
        map: this.map, 

       })
    })

     //Draw background layer
     this.map.drawLowerImage(this.ctx, cameraPerson);
 
 // draw objects in bettween layers
      Object.values(this.map.gameObjects).sort((a,b) => {
        return a.y - b.y;
      }).forEach(object => {
        object.sprite.draw(this.ctx, cameraPerson);
      })

     //Draw forground layer
     this.map.drawUpperImage(this.ctx, cameraPerson);
 
 
      requestAnimationFrame(() => {
       step();   
      })
    }
    step();
  }

  bindActionInput() {
    new KeyPressListener("Enter", () => {
      //Is there a person here to talk to?
      this.map.checkForActionCutscene()
    })
  }
  bindHeroPositionCheck() {
    document.addEventListener("PersonWalkingComplete", e => {
      if (e.detail.whoId === "hero") {
        //Hero's position has changed
        this.map.checkForFootstepCutscene()
      }
    })
  }
  startMap(mapConfig) {
    this.map = new OverworldMap(mapConfig);
  this.map.overworld = this;
  this.map.mountObjects();
   }
  //  change starting map here
  init() {
    this.startMap(window.OverworldMaps.DemoRoom);


    this.bindActionInput();
    this.bindHeroPositionCheck();
  
    this.directionInput = new DirectionInput();
    this.directionInput.init();
  
    this.startGameLoop();
  
    this.map.startCutscene([
      { type: "textMessage", text:"Test message for cutscene Nick"}

    ])
   
 
  }
 
 }