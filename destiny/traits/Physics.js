import Trait from "../build/Trait.js";

export default class Physics extends Trait {
    constructor() {
        super("physics");
    }

    update(entity, gameContext, room) {
        const {deltaTime} = gameContext;

        entity.position.x += entity.velocity.x*deltaTime;
        room.tileCollider.checkX(entity);

        entity.position.y += entity.velocity.y*deltaTime;
        room.tileCollider.checkY(entity);

        entity.velocity.y += room.gravity*deltaTime;
    }
}