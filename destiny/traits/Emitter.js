import Trait from "../build/Trait.js";

export default class Emitter extends Trait {
    constructor(interval = 1) {
        super("emitter");

        this.interval = interval;
        this.cooldown = this.interval;
        this.emitters = [];
    }

    add(emmiter) {
        this.emitters.push(emmiter);
    }

    emit(entity, room) {
        for (const emitter of this.emitters) {
            emitter(entity, room);
        }
    }

    update(entity, gameContext, room) {
        const {deltaTime} = gameContext;

        this.cooldown -= deltaTime;

        if (this.cooldown <= 0) {
            this.emit(entity, room);
            this.cooldown = this.interval;
        }
    }
}