import Vector2 from "../math/Vector2.js";

export default class Entity {
    constructor() {
        this.position = new Vector2();
        this.velocity = new Vector2();
        this.size = new Vector2();

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
    }
}