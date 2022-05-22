import Trait from "../build/Trait.js";

export default class Gravity extends Trait {
    constructor() {
        super("gravity");
    }

    update(entity, gameContext, room) {
        const {deltaTime} = gameContext;

        entity.velocity.y += room.gravity*deltaTime;
    }
}