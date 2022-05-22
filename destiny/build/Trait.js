import EventEmitter from "./EventEmitter.js";

export default class Trait {
    constructor(name) {
        this.NAME = name;
        this.events = new EventEmitter();
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

    update(entity, gameContext, room) {

    }
}