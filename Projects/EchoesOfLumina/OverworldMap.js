class OverworldMap {
    // core building block of the Maps
    constructor(config){
    this.gameObjects =config.gameObjects


    this.lowerImage = new Image();
    this.lowerImage.Src = config.lowerSrc;

    this.upperImage = new Image();
    this.upperImage.Src = config.upperSrc;
        }

// controls form the background images
drawLowerImage(ctx) {
    ctx.drawImage(this.lowerImage, 0, 0)

}
// controls for the forground 
drawLUpperImage(ctx) {
    ctx.drawImage(this.upperImage, 0, 0)

}
}

window.OverworldMaps = {
 MainTown : {
    lowersrc: "assets/images/Maps/DemoLower.png",
     upperSrc: "assets/images/Maps/DemoUpper.png",
    //  UnComment this when you figure out the map layout
    gameObjects: {
        hero: new GameObject({
            x: 5,
            y: 6,

        }),
        npc1: new GameObject({
            x:7,
            y: 9,
            src: "assets/images/characters/people/npc1.png"
        })
    }
 },
 Sewers : {
    lowersrc: "assets/images/Maps/KitchenLower.png",
     upperSrc: "assets/images/Maps/KitchenUpper.png", 
    gameObjects: {
        hero: new GameObject({
            x: 3,
            y: 1,

        }),
        npc1: new GameObject({
            x:9,
            y: 2,
            src: "assets/images/characters/people/npc1.png"
        }),
        npc2: new GameObject({
            x:10,
            y: 4,
            src: "assets/images/characters/people/npc2.png"
        })
    }
 },
 HouseQuest : {


 },

 Shop : {


 },

}
    







