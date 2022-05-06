import {createCanvas} from "../destiny.js";

export function createBackgroundLayer(room, sprites) {
    const tiles = room.tiles;
    const resolver = room.tileCollider.tiles;
    const buffer = createCanvas(272, 240); //TODO
    const context = buffer.getContext("2d");
    let startIndexX, endIndexX, startIndexY, endIndexY;

    function redraw(drawXFrom, drawXTo, drawYFrom, drawYTo) {
        startIndexX = drawXFrom;
        endIndexX = drawXTo;
        startIndexY = drawYFrom;
        endIndexY = drawYTo;

        for (let x = startIndexX; x <= endIndexX; x++) {
            const column = tiles.grid[x];

            if (column) {
                for (let y = startIndexY; y <= endIndexY; ++y) {
                    const tile = column[y];

                    if (sprites.animations.has(tile.name)) {
                        sprites.drawAnimation(
                            tile.name,
                            context,
                            x - startIndexX,
                            y - startIndexY,
                            room.totalTime
                        );
                    } else {
                        sprites.drawTile(
                            tile.name,
                            context,
                            x - startIndexX,
                            y - startIndexY
                        );
                    }
                }
            }
        }
    }

    return function drawBackgroundLayer(context, camera) {
        const drawWidth = resolver.toIndex(camera.size.x);
        const drawXFrom = resolver.toIndex(camera.position.x);
        const drawXTo = drawXFrom + drawWidth;
        const drawHeight = resolver.toIndex(camera.size.y);
        const drawYFrom = resolver.toIndex(camera.position.y);
        const drawYTo = drawYFrom + drawHeight;

        redraw(drawXFrom, drawXTo, drawYFrom, drawYTo);

        context.drawImage(
            buffer,
            -camera.position.x % 16,
            -camera.position.y % 16
        );
    }
}