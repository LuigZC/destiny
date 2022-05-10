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

    setCollisionGrid(matrix) {
        this.tileCollider = new TileCollider(matrix);
    }

    update(deltaTime) {
        this.entities.forEach(entity => {
            entity.update(deltaTime, this);
        });

        this.entities.forEach(entity => {
            this.entityCollider.check(entity);
        });

        this.entities.forEach(entity => {
            entity.finalize();
        });
    
        this.totalTime += deltaTime;
    }
}