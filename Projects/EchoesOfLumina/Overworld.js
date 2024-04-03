class Overworld {
  constructor(config) {
    this.element = config.element;
     // game screen size (keep small now for better FPS) CHANGE LATER DUMBASS -Nick
    this.canvas = this.element.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.map = null;
  }
//  recalls this loop every frame
startGameLoop(){
  const step = () => {
    // console.log("stepping!"); delete this at when finished debugging
// drawing the background
    this.map.drawLowerImage(this.ctx);

// draw objects in bettween layers
Object.values(this.map.gameObjects).forEach(object => {
  object.sprite.draw(this.ctx);
})


  // drawing the foreground
  this.map.drawUpperImage(this.ctx);

  
    requestAnimationFrame(() => {
      step();
    })
  }
  step();
}
  
  init() {
    this.map = new OverworldMap(window.OverworldMaps.MainTown)
this.startGameLoop();


 
  }
 
 }