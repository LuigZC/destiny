import EntityCollider from "./EntityCollider.js";
import TileCollider from "./TileCollider.js";
import Compositor from "./Compositor.js";

export default class Room {
    constructor() {
        this.compositor = new Compositor();
        this.entities = new Set();
        this.entityCollider = new EntityCollider(this.entities);
        this.tileCollider = null;
        this.gravity = 0;
        this.totalTime = 0;
    }

    addEntity(entity) {
        this.entities.add(entity);
    }

    removeEntity(entity) {
        this.entities.delete(entity);
    }

    hasEntity(entity) {
        return this.entities.has(entity);
    }

    setCollisionGrid(matrix) {
        this.tileCollider = new TileCollider(matrix);
    }

    update(gameContext) {
        this.entities.forEach(entity => {
            entity.update(gameContext, this);
        });

        this.entities.forEach(entity => {
            this.entityCollider.check(entity);
        });

        this.entities.forEach(entity => {
            entity.finalize();
        });
    
        this.totalTime += gameContext.deltaTime;
    }
}