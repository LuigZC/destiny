import Room from "../build/Room.js";
import {createBackgroundLayer} from "../layers/background.js";
import {createSpriteLayer} from "../layers/sprite.js";
import {loadSpriteSheet} from "./loadSpriteSheet.js";
import {loadJSON} from "./loadJSON.js";
import { Matrix } from "../destiny.js";

function createCollisionGrid(tiles, patterns) {
    const grid = new Matrix();

    for (const {tile, x, y} of expandTiles(tiles, patterns)) {
        grid.set(x, y, {type: tile.type});
    }

    return grid;
}

function createBackgroundGrid(tiles, patterns) {
    const grid = new Matrix();

    for (const {tile, x, y} of expandTiles(tiles, patterns)) {
        grid.set(x, y, {name: tile.name});
    }

    return grid;
}

function* expandSpan(xStart, xLength, yStart, yLength) {
    const xEnd = xStart + xLength;
    const yEnd = yStart + yLength;

    for (let x = xStart; x < xEnd; x++) {
        for (let y = yStart; y < yEnd; y++) {
            yield {x , y};
        }
    }
}

function expandRange(range) {
    if (range.length === 4) {
        const [xStart, xLength, yStart, yLength] = range;

        return expandSpan(xStart, xLength, yStart, yLength);
    } else if (range.length === 3) {
        const [xStart, xLength, yStart] = range;

        return expandSpan(xStart, xLength, yStart, 1);
    } else if (range.length === 2) {
        const [xStart, yStart] = range;

        return expandSpan(xStart, 1, yStart, 1);
    }
}

function* expandRanges(ranges) {
    for (const range of ranges) {
        yield* expandRange(range);
    }
}

function* expandTiles(tiles, patterns) {
    function* walkTiles(tiles, offSetX, offSetY) {
        for (const tile of tiles) {
            for (const {x, y} of expandRanges(tile.ranges)) {
                const derivedX = x + offSetX;
                const derivedY = y + offSetY;
    
                if (tile.pattern) {
                    const tiles = patterns[tile.pattern].tiles;

                    yield* walkTiles(tiles, derivedX, derivedY);
                } else {
                    yield {
                        tile,
                        x: derivedX,
                        y: derivedY
                    };
                }
            }
        }
    }

    yield* walkTiles(tiles, 0, 0);
}

function setupCollision(roomSpec, room) {
    const mergedTiles = roomSpec.layers.reduce((mergedTiles, layerSpec) => {
        return mergedTiles.concat(layerSpec.tiles);
    }, []);

    const collisionGrid = createCollisionGrid(mergedTiles, roomSpec.patterns);
    room.setCollisionGrid(collisionGrid);
}

function setupBackground(roomSpec, room, backgroundSprites) {
    roomSpec.layers.forEach(layer => {
        const backgroundGrid = createBackgroundGrid(layer.tiles, roomSpec.patterns);

        const backgroundLayer = createBackgroundLayer(room, backgroundGrid, backgroundSprites);
        room.compositor.layers.push(backgroundLayer);
    });
}

function setupEntities(roomSpec, room, entityFactory) {
    roomSpec.entities.forEach(({name, position: [x, y]}) => {
        const createEntity = entityFactory[name];
        const entity = createEntity();

        entity.position.set(x, y);

        room.entities.add(entity);
    });

    const spriteLayer = createSpriteLayer(room.entities);
    room.compositor.layers.push(spriteLayer);
}

export function createRoomLoader(entityFactory) {
    return function loadRoom(name) {
        return loadJSON("../../../worlds/"+name+".json").then(roomSpec => { // TODO
            return Promise.all([
                roomSpec,
                loadSpriteSheet(roomSpec.spriteSheet)
            ]).then(([roomSpec, backgroundSprites]) => {
                const room = new Room();

                setupCollision(roomSpec, room);
                setupBackground(roomSpec, room, backgroundSprites);
                setupEntities(roomSpec, room, entityFactory);
                
                return room;
            });
        });
    }
}