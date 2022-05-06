import TileCollider from "./TileCollider.js";
import Compositor from "./Compositor.js";
import Matrix from "../math/Matrix.js";

export default class Room {
    constructor() {
        this.compositor = new Compositor();
        this.entities = new Set();
        this.tiles = new Matrix();
        this.tileCollider = new TileCollider(this.tiles);
        this.gravity = 0;
        this.totalTime = 0;
    }

    update(deltaTime) {
        this.entities.forEach(entity => {
            entity.update(deltaTime);

            entity.position.x += entity.velocity.x * deltaTime;
            this.tileCollider.checkX(entity);
            entity.position.y += entity.velocity.y * deltaTime;
            this.tileCollider.checkY(entity);

            entity.velocity.y += this.gravity * deltaTime;
        });
    
        this.totalTime += deltaTime;
    }
}