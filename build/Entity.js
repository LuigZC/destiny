import BoundingBox from "./BoundingBox.js";
import Vector2 from "../math/Vector2.js";

export default class Entity {
    constructor() {
        this.position = new Vector2();
        this.velocity = new Vector2();
        this.size = new Vector2();
        this.offset = new Vector2();
        this.bounds = new BoundingBox(this.position, this.size, this.offset);
        this.canCollide = true;
        this.lifeTime = 0;
        this.traits = [];
    }

    addTrait(trait) {
        this.traits.push(trait);
        this[trait.NAME] = trait;
    }

    collides(canditate) {
        this.traits.forEach(trait => {
            trait.collides(this, canditate);
        });
    }

    obstruct(side) {
        this.traits.forEach(trait => {
            trait.obstruct(this, side);
        });
    }

    draw() {

    }

    update(deltaTime, room) {
        this.traits.forEach(trait => {
            trait.update(this, deltaTime, room);
        });

        this.lifeTime += deltaTime;
    }
}