import Trait from "../Trait.js";
import {Sides} from "../../destiny.js";

export default class Solid extends Trait {
    constructor() {
        super("solid");

        this.enabled = true;
    }

    obstruct(entity, side, match) {
        if (!this.enabled) return;

        if (side === Sides.RIGHT) {
            entity.bounds.left = match.x1 - entity.size.x; // TODO
            entity.velocity.x = 0;
        } else if (side === Sides.BOTTOM) {
            entity.bounds.top = match.y1 - entity.size.y; // TODO
            entity.velocity.y = 0;
        } else if (side === Sides.LEFT) {
            entity.bounds.left = match.x2;
            entity.velocity.x = 0;
        } else if (side === Sides.TOP) {
            entity.bounds.top = match.y2;
            entity.velocity.y = 0;
        }
    }
}