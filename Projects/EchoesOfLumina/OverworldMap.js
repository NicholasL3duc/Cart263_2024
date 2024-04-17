class OverworldMap {
    constructor(config) {
        // core building block of the Maps
      this.gameObjects = config.gameObjects;
  
        this.walls = config.walls || {};

      this.lowerImage = new Image();
      this.lowerImage.src = config.lowerSrc;
  
      this.upperImage = new Image();
      this.upperImage.src = config.upperSrc;
    }
  // controls form the background images
  
    drawLowerImage(ctx, cameraPerson) {
      ctx.drawImage  (
    this.lowerImage, 
      utils.withGrid(10.5) - cameraPerson.x,
      utils.withGrid(6) - cameraPerson.y,
      )
    }
  // controls for the forground 
    drawUpperImage(ctx, cameraPerson) {
      ctx.drawImage (
        this.upperImage, 
        utils.withGrid(10.5) - cameraPerson.x,
        utils.withGrid(6) - cameraPerson.y,
        )
    } 

    isSpaceTaken(currentX, currentY, direction) {
        const {x,y} = utils.nextPosition(currentX, currentY, direction);
        return this.walls [`${x},${y}`] || false;
    }

    mountObject() {
     Object.keys(this.gameObjects).forEach(key =>{

      let object = this.gameObjects[key];
      object.id = key;

//  this determins if mount is possible
        object.mount(this);

     })
    }

    addWall(x,y) {
        this.walls [`${x},${y}`] = true;
    }
    removeWall(x,y) {
       delete this.walls [`${x},${y}`]
    }
    moveWall(wasX, wasY, direction) {
        // removes the past wall
        this.removeWall(wasX, wasY);
        // creates a new one but offest from the original
        const {x,y} = utils.nextPosition(wasX, wasY, direction);
        // places new wall
        this.addWall(x,y);

  }
}

  
  window.OverworldMaps = {
    DemoRoom: {
      lowerSrc: "assets/images/maps/DemoLower.png",
      upperSrc: "assets/images/maps/DemoUpper.png",
       //  UnComment this when you figure out the map layout
      gameObjects: {
        hero: new Person({
        isPlayerControlled: true,
          x: utils.withGrid(5),
          y: utils.withGrid(5),
        }),
        GrimReaper: new Person({
          x: utils.withGrid(7),
          y: utils.withGrid(9),
          src: "assets/images/characters/people/npc1.png",
          behaviorLoop: [
            { type: "stand", direction: "left", time: 800 },
            { type: "stand", direction: "up", time: 800 },
            { type: "stand", direction: "right", time: 800 },
            { type: "stand", direction: "up", time: 800 },

          ]
        }),
        npcA: new Person({
          x: utils.withGrid(16,9),
          y: utils.withGrid(9),
          src: "assets/images/characters/people/npc2.png",
          // idle movement tester ( will change later for the death cutscene)
          behaviorLoop: [
            { type: "walk", direction: "left" },
            { type: "stand", direction: "up", time: 800 },
            { type: "walk", direction: "up" },
            { type: "walk", direction: "right" },
            { type: "walk", direction: "down" },
          ]
        }),
      },
      walls: {
        // utility to atomate the values
        // [] dynamic key
        [utils.asGridCoord(0,0 && 0,29)] : true,
        [utils.asGridCoord(7,9)] : true,
        [utils.asGridCoord(16,9)] : true,
        [utils.asGridCoord(100,0 && 0,100)] : true,
      }
    },
    Kitchen: {
      lowerSrc: "assets/images/maps/KitchenLower.png",
      upperSrc: "assets/images/maps/KitchenUpper.png",
      gameObjects: {
        hero: new GameObject({
          x: 3,
          y: 5,
        }),
        npcA: new GameObject({
          x: 9,
          y: 6,
          src: "assets/images/characters/people/npc2.png"
        }),
        npcB: new GameObject({
          x: 10,
          y: 8,
          src: "assets/images/characters/people/npc3.png"
        })
      }
    },
  }





