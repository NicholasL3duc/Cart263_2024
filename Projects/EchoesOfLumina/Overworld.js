class Overworld {
    constructor(config) {
      this.element = config.element;
      // game screen size (keep small now for better FPS) CHANGE LATER DUMBASS -Nick
      this.canvas = this.element.querySelector(".game-canvas");
      this.ctx = this.canvas.getContext("2d");
    }
   
    init() {
      const image = new Image();
      image.onload = () => {
        this.ctx.drawImage(image,0,0)
      };
      image.src = "assets/images/maps/DemoLower.png";
   
   
      const x = 5;
      const y = 6;
  //  shadow on player
      const shadow = new Image();
      shadow.onload = () => {
       this.ctx.drawImage(
         shadow, 
         0, //left cut 
         0, //top cut,
         32, //width of cut
         32, //height of cut
         x * 16 - 8,
         y * 16 - 18,
         32,
         32
      )
      }
      shadow.src = "assets/images/characters/shadow.png";
   
  //  Player Settings
      const hero = new Image();
      hero.onload = () => {
        this.ctx.drawImage(
          hero, 
          0, //left cut 
          0, //top cut,
          32, //width of cut
          32, //height of cut
          x * 16 - 8,
          y * 16 - 18,
          32,
          32
       )
      }
      hero.src = "assets/images/characters/people/hero.png";
   
   
    }
   
   }