import BoundingBox from "./BoundingBox.js";
import Vector2 from "../math/Vector2.js";

export default class Entity {
    constructor() {
        this.position = new Vector2();
        this.velocity = new Vector2();
        this.size = new Vector2();
        this.offset = new Vector2();
        this.bounds = new BoundingBox(this.position, this.size, this.offset);
        this.lifeTime = 0;
        this.traits = [];
    }

    addTrait(trait) {
        this.traits.push(trait);
        this[trait.NAME] = trait;
    }

    obstruct(side) {
        this.traits.forEach(trait => {
            trait.obstruct(this, side);
        });
    }

    update(deltaTime) {
        this.traits.forEach(trait => {
            trait.update(this, deltaTime);
        });

        this.lifeTime += deltaTime;
    }
}