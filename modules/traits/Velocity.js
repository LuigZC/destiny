import Trait from "../Trait.js";

export default class Velocity extends Trait {
    constructor() {
        super("vel"); // TODO
    }

    update(entity, gameContext) {
        const {deltaTime} = gameContext;

        entity.position.x += entity.velocity.x*deltaTime;
        entity.position.y += entity.velocity.y*deltaTime;
    }
}