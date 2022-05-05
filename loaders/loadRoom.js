import Room from "../build/Room.js";
import {createBackgroundLayer} from "../layers/background.js";
import {createSpriteLayer} from "../layers/sprite.js";
import {loadSpriteSheet} from "./loadSpriteSheet.js";
import {loadJSON} from "./loadJSON.js";

function createTiles(room, backgrounds) {
    function applyRange(background, xStart, xLength, yStart, yLength) {
        const xEnd = xStart + xLength;
        const yEnd = yStart + yLength;

        for (let x = xStart; x < xEnd; x++) {
            for (let y = yStart; y < yEnd; y++) {
                room.tiles.set(x, y, {
                    name: background.tile,
                    type: background.type
                });
            }
        }
    }

    backgrounds.forEach(background => {
        background.ranges.forEach(range => {
            if (range.length === 4) {
                const [xStart, xLength, yStart, yLength] = range;

                applyRange(background, xStart, xLength, yStart, yLength);
            } else if (range.length === 3) {
                const [xStart, xLength, yStart] = range;

                applyRange(background, xStart, xLength, yStart, 1);
            } else if (range.length === 2) {
                const [xStart, yStart] = range;

                applyRange(background, xStart, 1, yStart, 1);
            }
        });
    });
}

export function loadRoom(name) {
    return loadJSON("../../../worlds/"+name+".json").then(roomSpec => { // TODO
        return Promise.all([
            roomSpec,
            loadSpriteSheet(roomSpec.spriteSheet)
        ]).then(([roomSpec, backgroundSprites]) => {
            const room = new Room();

            createTiles(room, roomSpec.backgrounds);

            const backgroundLayer = createBackgroundLayer(room, backgroundSprites);
            const spriteLayer = createSpriteLayer(room.entities);

            room.compositor.layers.push(backgroundLayer);
            room.compositor.layers.push(spriteLayer);

            return room;
        });
    });
}