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
     Object.values(this.map.gameObjects).forEach(object => {
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
 
  init() {
   this.map = new OverworldMap(window.OverworldMaps.DemoRoom);
  this.map.mountObject();

   this.directionInput = new DirectionInput();
    this.directionInput.init();
    this.directionInput.direction; // returns the keys 


   this.startGameLoop();
   
    this.map.startCutscene([
      { who: "GrimReaper", type: "walk",  direction: "down" },
      { who: "GrimReaper", type: "walk",  direction: "down" },
      { who: "GrimReaper", type: "walk",  direction: "down" },
      { who: "GrimReaper", type: "walk",  direction: "down" },
      { who: "GrimReaper", type: "walk",  direction: "down" },
      { who: "GrimReaper", type: "walk",  direction: "down" },
      { who: "GrimReaper", type: "walk",  direction: "down" },
      { who: "GrimReaper", type: "walk",  direction: "down" },
      { who: "GrimReaper", type: "walk",  direction: "down" },

      // comment for now
      { who: "npcA", type: "walk",  direction: "left" },
      { who: "npcA", type: "walk",  direction: "left" },
      { who: "npcA", type: "stand",  direction: "up", time: 800 },

    ])
 
  }
 
 }