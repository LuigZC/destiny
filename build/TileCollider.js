import TileResolver from "./TileResolver.js";
import {Sides} from "../destiny.js";

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

        matches.forEach(match => {
            if (match.tile.type !== "solid") return;
            if (entity.velocity.x > 0) {
                if (entity.bounds.right > match.x1) {
                    entity.bounds.left = match.x1 - entity.size.x; // TODO
                    entity.velocity.x = 0;
                    entity.obstruct(Sides.RIGHT);
                }
            } else if (entity.velocity.x < 0) {
                if (entity.bounds.left < match.x2) {
                    entity.bounds.left = match.x2;
                    entity.velocity.x = 0;
                    entity.obstruct(Sides.LEFT);
                }
            }
        });
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

        matches.forEach(match => {
            if (match.tile.type !== "solid") return;
            if (entity.velocity.y > 0) {
                if (entity.bounds.bottom > match.y1) {
                    entity.bounds.top = match.y1 - entity.size.y; // TODO
                    entity.velocity.y = 0;
                    entity.obstruct(Sides.BOTTOM);
                }
            } else if (entity.velocity.y < 0) {
                if (entity.bounds.top < match.y2) {
                    entity.bounds.top = match.y2;
                    entity.velocity.y = 0;
                    entity.obstruct(Sides.TOP);
                }
            }
        });
    }

    test(entity) {
        this.checkX(entity);
        this.checkY(entity);
    }
}