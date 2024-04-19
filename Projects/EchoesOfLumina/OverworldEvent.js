class OverworldEvent {
    constructor({map, event}) {
        this.map = map;
        this.event = event;

    }
//  once resolves happen (game objects line 50) will pass 
    stand(resolve) {


    }
    walk(resolve) {
        const who = this.map.gameObjects[ this.event.who ]
        who.startBehaviour({
            map: this.map
        }, {
            type: "walk",
            direction: this.even.direction
        })


    }
    init(){
        return new Promise(resolve => {
            this[this.event.type] (resolve)

        })

    }
}