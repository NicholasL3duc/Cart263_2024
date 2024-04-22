class OverworldMap {
    constructor(config) {
        // core building block of the Maps
      this.gameObjects = config.gameObjects;
  this.cutsceneSpaces = config.cutsceneSpaces || {}; 

        this.walls = config.walls || {};
        var img = new Image();
        img.onload = function() {
          somcanvas.getContext('2d').drawImage(img, 0, 0);
        };
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
      lowerSrc: "assets/images/Maps/DemoLower.png",
      upperSrc: "assets/images/Maps/DemoUpper.png",
       //  UnComment this when you figure out the map layout
      gameObjects: {
        hero: new Person({
        isPlayerControlled: true,//54,37
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
          x: utils.withGrid(27),
          y: utils.withGrid(5),
          src: "assets/images/characters/people/npc3.png",
          // idle movement tester ( will change later for the death cutscene)
          behaviorLoop: [

          ],
          talking: [
            {
              events: [
                { type: "textMessage", text: "OMG HE'S DEAD", },
                { type: "textMessage", text: "i Need to get out NOW", },
                { type: "textMessage", text: " *you notice something laying next to him"},
                { type: "textMessage", text: "What's this?"},
                { type: "textMessage", text: "Hero Has Recieved the 1st Part Of the Key!"},
                { who: "hero", type: "walk",  direction: "down" },
              ]
            }
          ]
        }),
        npcB: new Person({
          x: utils.withGrid(54),
          y: utils.withGrid(6),
          src: "assets/images/characters/people/npc2.png",
          // idle movement tester ( will change later for the death cutscene)
          behaviorLoop: [

          ],
          talking: [
            {
              events: [
                { type: "textMessage", text: "theres a dead body here", faceHero: "npcB" },
                { type: "textMessage", text: " *you notice something shiny in his hands"},
                { type: "textMessage", text: "What's this?"},
                { type: "textMessage", text: "Hero Has Recieved the 2nd Part Of the Key!"},
                { type: "textMessage", text: "Im almost free!"},
                { type: "textMessage", text: "the last one should be down the path"},
                { who: "hero", type: "walk",  direction: "down" },
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
        [utils.asGridCoord((6,51))] : true,
        [utils.asGridCoord(12,11)] : true,
        [utils.asGridCoord(11,11)] : true,
        [utils.asGridCoord(17,3)] : true,
        [utils.asGridCoord((6,51))] : true,
        [utils.asGridCoord(0,0 && 0,29)] : true,
        [utils.asGridCoord(7,9)] : true,
        [utils.asGridCoord(16,9)] : true,
        [utils.asGridCoord((6,51))] : true,
        [utils.asGridCoord(0,0 && 0,29)] : true,
        [utils.asGridCoord(7,9)] : true,
        [utils.asGridCoord(16,9)] : true,
        [utils.asGridCoord((6,51))] : true,
        [utils.asGridCoord(0,0 && 0,29)] : true,
        [utils.asGridCoord(7,9)] : true,
        [utils.asGridCoord(16,9)] : true,
        [utils.asGridCoord((6,51))] : true,
        [utils.asGridCoord(0,0 && 0,29)] : true,
        [utils.asGridCoord(7,9)] : true,
        [utils.asGridCoord(16,9)] : true,
        [utils.asGridCoord((6,51))] : true,
        [utils.asGridCoord(0,0 && 0,29)] : true,
        [utils.asGridCoord(7,9)] : true,
        [utils.asGridCoord(16,9)] : true,
        [utils.asGridCoord((6,51))] : true,
      },
      cutsceneSpaces: {
        [utils.asGridCoord(18,5)]: [
          {
            events: [
      { who: "GrimReaper",type: "stand", direction: "up", time: 800 },
      { who: "GrimReaper", type: "walk",  direction: "down" },
      { who: "GrimReaper", type: "walk",  direction: "down" },
      { who: "GrimReaper", type: "walk",  direction: "down" },
      { who: "GrimReaper", type: "walk",  direction: "down" },
      { who: "GrimReaper", type: "walk",  direction: "down" },
      { who: "GrimReaper", type: "walk",  direction: "down" },
      { who: "GrimReaper", type: "walk",  direction: "down" },
      { who: "GrimReaper", type: "walk",  direction: "down" },
      { who: "GrimReaper", type: "walk",  direction: "down" },
      { who: "GrimReaper", type: "walk",  direction: "down" },
      { who: "GrimReaper", type: "walk",  direction: "down" },
      { who: "GrimReaper", type: "walk",  direction: "down" },
      { who: "GrimReaper", type: "walk",  direction: "down" },
      { who: "GrimReaper", type: "walk",  direction: "down" },
      { who: "GrimReaper", type: "walk",  direction: "down" },
      { who: "GrimReaper", type: "walk",  direction: "down" },
      { who: "GrimReaper", type: "walk",  direction: "down" },
      { who: "GrimReaper", type: "walk",  direction: "down" },
      { who: "GrimReaper", type: "walk",  direction: "down" },
      { who: "GrimReaper", type: "walk",  direction: "left" },
      { who: "GrimReaper", type: "walk",  direction: "left" },
      { who: "GrimReaper", type: "walk",  direction: "left" },
      { who: "GrimReaper", type: "walk",  direction: "left" },
      { type: "textMessage", text: "Who was That??"},
            ]
          }
        ],
        [utils.asGridCoord(6,5)]: [
          {
            events: [
              { type: "textMessage", text: "Ugh... Where am i??" },
              { who: "hero", type: "stand",  direction: "down", time: 500 },
              { who: "hero", type: "stand",  direction: "up", time: 500  },
              { who: "hero", type: "stand",  direction: "right", time: 500  },
              { who: "hero", type: "stand",  direction: "left", time: 500  },
              { who: "hero", type: "stand",  direction: "right", time: 500  },
                { type: "textMessage", text: "I need to find a way out..."},
                { type: "textMessage", text: "i should follow this path"},
        
            ]
          }
        ],
        [utils.asGridCoord(6,51)]: [
          {
            events: [
              { type: "textMessage", text: "theres a way down"},
              { type: "textMessage", text: "I should check it out"},
              { type: "changeMap", map: "Sewer" }
              
            ]
          }
        ],
      [utils.asGridCoord(32,20)]: [
        {
          events: [
              { type: "textMessage", text: "theres writing on the statue"},
              { type: "textMessage", text: "FIND THE 3 PARTS OF THE KEY TO ESCAPE...."},
              { type: "textMessage", text: "ONLY THEN WILL THE DOOR SHOW ITSELF"},
              { who: "hero", type: "stand",  direction: "down", time: 500 },
              { who: "hero", type: "walk",  direction: "down" },
              { type: "textMessage", text: "theres something scratched on the floor tile"},
              { type: "textMessage", text: "T.e... fir.t...KEY...Past...t...Rock"},
              { type: "textMessage", text: "...."},
              { type: "textMessage", text: "maybe i should check out this past this boulder "},
              { who: "hero", type: "walk",  direction: "right" },

          ]
        }
      ],
      [utils.asGridCoord(53,37)]: [
        {
          events: [
            { type: "textMessage", text: "I think this is it!!"},
            { type: "textMessage", text: "*starts assembling key*"},
            { type: "textMessage", text: "i hope this works"},
            { type: "textMessage", text: "*the door creeks*"},
            { type: "changeMap", map: "EndingRoom" }
          
        
          ]
        }
      ],
      [utils.asGridCoord(53,36)]: [
        {
          events: [
            { type: "textMessage", text: "I think this is it!!"},
            { type: "textMessage", text: "*starts assembling key*"},
            { type: "textMessage", text: "i hope this works"},
            { type: "textMessage", text: "*the door creeks*"},
            { type: "changeMap", map: "EndingRoom" }
          
        
          ]
        }
      ],
      [utils.asGridCoord(53,35)]: [
        {
          events: [
            { type: "textMessage", text: "I think this is it!!"},
            { type: "textMessage", text: "*starts assembling key*"},
            { type: "textMessage", text: "i hope this works"},
            { type: "textMessage", text: "*the door creeks*"},
            { type: "changeMap", map: "EndingRoom" }
          
        
          ]
        }
      ]
    },


      
    },
    Sewer: {
      lowerSrc: "assets/images/Maps/sewerLower.png",
      upperSrc: "assets/images/Maps/sewerUpper.png",
      gameObjects: {
        hero: new Person({
          isPlayerControlled: true,
          x: utils.withGrid(9),
          y: utils.withGrid(27),
        }),
        npcB: new Person({
          x: utils.withGrid(15),
          y: utils.withGrid(10),
          src: "assets/images/characters/people/npc2.png",
          // idle movement tester ( will change later for the death cutscene)
          behaviorLoop: [

          ],
          talking: [
            {
              events: [
                { type: "textMessage", text: "Im dying and wont be able to escape...", faceHero: "npcB" },
                { type: "textMessage", text: "tell my twin brother i love him..."},
                { type: "textMessage", text: "Take this..."},
                { type: "textMessage", text: "Hero Has Recieved The Final Part Of the Key!"},
                { type: "textMessage", text: "A fadded note is attached"},
                { type: "textMessage", text: "t..e... exit....Do.r...End....Path.."},
                { type: "textMessage", text: "i think the exit is at the end of the path"},
                { who: "hero", type: "walk",  direction: "down" },
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
    [utils.asGridCoord(10,27)]: [
      {
        events: [
          { type: "textMessage", text: "i think this is where it lives..."},
          { type: "textMessage", text: "Maybe i can find the last key here"},
          { type: "textMessage", text: "i need to be careful"},
 
        ]
      }
    ],
    [utils.asGridCoord(50,24)]: [
      {
        events: [
          { type: "textMessage", text: "Eeeyyaaauuugghhhhh!"},
          { type: "textMessage", text: "*SLASH*"},
          
          { type: "textMessage", text: "(i think someone just died!!!)"},
  
 
        ]
      }
    ],
    [utils.asGridCoord(49,24)]: [
      {
        events: [
          { type: "textMessage", text: "Eeeyyaaauuugghhhhh!"},
          { type: "textMessage", text: "*SLASH*"},
          
          { type: "textMessage", text: "(i think someone just died!!!)"},
  
 
        ]
      }
    ],
    [utils.asGridCoord(51,24)]: [
      {
        events: [
          { type: "textMessage", text: "Eeeyyaaauuugghhhhh!"},
          { type: "textMessage", text: "*SLASH*"},
          
          { type: "textMessage", text: "(i think someone just died!!!)"},
  
 
        ]
      }
    ],
    [utils.asGridCoord(48,15)]: [
      {
        events: [
          { type: "textMessage", text: "Thats the way out!!"},
          { type: "textMessage", text: "i should still look around for a part of the key"},
  
 
        ]
      }
    ],
    [utils.asGridCoord(49,15)]: [
      {
        events: [
          { type: "textMessage", text: "Thats the way out!!"},
          { type: "textMessage", text: "i should still look around for a part of the key"},
  
 
        ]
      }
    ],
    [utils.asGridCoord(50,15)]: [
      {
        events: [
          { type: "textMessage", text: "Thats the way out!!"},
          { type: "textMessage", text: "i should still look around for a part of the key"},
  
 
        ]
      }
    ],
    [utils.asGridCoord(48,11)]: [
      {
        events: [
          { type: "changeMap", map: "DemoRoom" }
        ]
      }
    ],
// code ending on door here

    }
  },
  EndingRoom: {
    lowerSrc: "assets/images/Maps/EndingRoomLower.png",
    upperSrc: "assets/images/Maps/EndingRoomLower.png",
    gameObjects: {
      hero: new Person({
        isPlayerControlled: true,
        x: utils.withGrid(5),
        y: utils.withGrid(5),
      })
    }
  }
}