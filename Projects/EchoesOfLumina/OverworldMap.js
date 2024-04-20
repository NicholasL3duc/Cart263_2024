class OverworldMap {
    constructor(config) {
        // core building block of the Maps
      this.gameObjects = config.gameObjects;
  this.cutsceneSpaces = config.cutsceneSpaces || {}; 
        this.walls = config.walls || {};

      this.lowerImage = new Image();
      this.lowerImage.src = config.lowerSrc;
  
      this.upperImage = new Image();
      this.upperImage.src = config.upperSrc;


      this.isCutscenePlaying = false;
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

    mountObjects() {
     Object.keys(this.gameObjects).forEach(key =>{

      let object = this.gameObjects[key];
      object.id = key;

//  this determins if mount is possible
        object.mount(this);

     })
    }
    async startCutscene(events) {
      this.isCutscenePlaying = true;
  
      for (let i=0; i<events.length; i++) {
        const eventHandler = new OverworldEvent({
          event: events[i],
          map: this,
        })
        await eventHandler.init();
        
      }
      this.isCutscenePlaying = false;


    //Reset NPCs to do their idle behavior
    Object.values(this.gameObjects).forEach(object => object.doBehaviorEvent(this))
  }

  checkForActionCutscene() {
    const hero = this.gameObjects["hero"];
    const nextCoords = utils.nextPosition(hero.x, hero.y, hero.direction);
    const match = Object.values(this.gameObjects).find(object => {
      return `${object.x},${object.y}` === `${nextCoords.x},${nextCoords.y}`
    });
    if (!this.isCutscenePlaying && match && match.talking.length) {
      //  the number is the slider for which cutscene i want
      this.startCutscene(match.talking[0].events)
    }
  }

  checkForFootstepCutscene() {
    const hero = this.gameObjects["hero"];
    const match = this.cutsceneSpaces[ `${hero.x},${hero.y}` ];
    if (!this.isCutscenePlaying && match) {
      this.startCutscene( match[0].events )
    }
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
          x: utils.withGrid(27),
          y: utils.withGrid(6),
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
          ],
          talking: [
            {
              events: [
                { type: "textMessage", text: "I'm busy...", faceHero: "npcA" },
                { type: "textMessage", text: "Go away!"},
                { who: "hero", type: "walk",  direction: "up" },
              ]
            }
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
      },
      cutsceneSpaces: {
        [utils.asGridCoord(5,10)]: [
          {
            events: [
              { who: "npcB", type: "walk",  direction: "left" },
              { who: "npcB", type: "stand",  direction: "up", time: 500 },
              { type: "textMessage", text:"RUNNNNN!"},
              { who: "npcB", type: "walk",  direction: "right" },
              { who: "hero", type: "walk",  direction: "down" },
              { who: "hero", type: "walk",  direction: "left" },
            ]
          }
        ],
        [utils.asGridCoord(5,7)]: [
          {
            events: [
              { type: "changeMap", map: "Sewer" }
            ]
          }
        ]
      }
      
    },
    Sewer: {
      lowerSrc: "assets/images/Maps/sewerLower.png",
      upperSrc: "assets/images/Maps/sewerUpper.png",
      gameObjects: {
        hero: new Person({
          isPlayerControlled: true,
          x: utils.withGrid(5),
          y: utils.withGrid(5),
        }),
        npcA: new Person({
          x: utils.withGrid(10),
          y: utils.withGrid(8),
          src: "assets/images/characters/people/npc1.png",
          talking: [
            {
              events: [
                { type: "textMessage", text: "You made it!", faceHero:"npcA" },
              ]
            }
          ]
        })
      }
    },
  }





