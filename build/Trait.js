export default class Trait {
    constructor(name) {
        this.NAME = name;
        this.sounds = new Set();
        this.tasks = [];
    }

    finalize() {
        this.tasks.forEach(task => task());
        this.tasks.length = 0;
    }

    queue(task) {
        this.tasks.push(task);
    }

    collides(us, them) {
        
    }

    obstruct(entity, side) {

    }
    
    playSounds(audioBoard, audioContext) {
        this.sounds.forEach(name => {
            audioBoard.play(name, audioContext);
        });

        this.sounds.clear();
    }

    update(entity, gameContext, room) {

    }
}