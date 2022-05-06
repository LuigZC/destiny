import TileResolver from "./TileResolver.js";
import {Sides} from "../destiny.js";

export default class TileCollider {
    constructor(tileMatrix) {
        this.tiles = new TileResolver(tileMatrix);
    }

    checkX(entity) {
        let x;

        if (entity.velocity.x > 0) {
            x = entity.position.x + entity.size.x;
        } else if (entity.velocity.x < 0) {
            x = entity.position.x;
        } else return;

        const matches = this.tiles.searchByRange(
            x, x,
            entity.position.y, entity.position.y + entity.size.y
        );

        matches.forEach(match => {
            if (match.tile.type !== "solid") return;
            if (entity.velocity.x > 0) {
                if (entity.position.x + entity.size.x > match.x1) {
                    entity.position.x = match.x1 - entity.size.x;
                    entity.velocity.x = 0;
                    entity.obstruct(Sides.RIGHT);
                }
            } else if (entity.velocity.x < 0) {
                if (entity.position.x < match.x2) {
                    entity.position.x = match.x2;
                    entity.velocity.x = 0;
                    entity.obstruct(Sides.LEFT);
                }
            }
        });
    }

    checkY(entity) {
        let y;

        if (entity.velocity.y > 0) {
            y = entity.position.y + entity.size.y;
        } else if (entity.velocity.y < 0) {
            y = entity.position.y;
        } else return;

        const matches = this.tiles.searchByRange(
            entity.position.x, entity.position.x + entity.size.x,
            y, y
        );

        matches.forEach(match => {
            if (match.tile.type !== "solid") return;
            if (entity.velocity.y > 0) {
                if (entity.position.y + entity.size.y > match.y1) {
                    entity.position.y = match.y1 - entity.size.y;
                    entity.velocity.y = 0;
                    entity.obstruct(Sides.BOTTOM);
                }
            } else if (entity.velocity.y < 0) {
                if (entity.position.y < match.y2) {
                    entity.position.y = match.y2;
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