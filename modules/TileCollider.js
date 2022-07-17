import TileResolver from "./TileResolver.js";
import {solid} from "./tiles/solid.js";

const handlers = { //TODO
    "solid": solid
}

export default class TileCollider {
    constructor(tileMatrix) {
        this.tiles = new TileResolver(tileMatrix);
    }

    checkX(entity) {
        let x;

        if (entity.velocity.x > 0) x = entity.bounds.right;
        else if (entity.velocity.x < 0) x = entity.bounds.left;
        else return;

        const matches = this.tiles.searchByRange(
            x, x,
            entity.bounds.top,
            entity.bounds.bottom
        );

        for (const match of matches) {
            this.handle(0, entity, match);
        }
    }

    checkY(entity) {
        let y;

        if (entity.velocity.y > 0) y = entity.bounds.bottom;
        else if (entity.velocity.y < 0) y = entity.bounds.top;
        else return;

        const matches = this.tiles.searchByRange(
            entity.bounds.left,
            entity.bounds.right,
            y, y
        );

        for (const match of matches) {
            this.handle(1, entity, match);
        }
    }

    handle(index, entity, match) {
        const handler = handlers[match.tile.type];

        if (handler) handler[index](entity, match);
    }
}