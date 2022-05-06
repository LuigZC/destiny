import SpriteSheet from "../build/SpriteSheet.js";
import {createAnimation} from "../destiny.js";
import {loadImage} from "./loadImage.js";
import {loadJSON} from "./loadJSON.js";

export function loadSpriteSheet(name) {
    return loadJSON("/sprites/"+name+".json").then(sheetSpec => { // TODO
        return Promise.all([
            sheetSpec,
            loadImage(sheetSpec.imageURL)
        ]).then(([sheetSpec, image]) => {
            const sprites = new SpriteSheet(
                image,
                sheetSpec.tileWidth,
                sheetSpec.tileHeight
            );

            if (sheetSpec.tiles) {
                sheetSpec.tiles.forEach(tileSpec => {
                    sprites.defineTile(
                        tileSpec.name,
                        tileSpec.index[0],
                        tileSpec.index[1]
                    );
                });
            }
            if (sheetSpec.frames) {
                sheetSpec.frames.forEach(frameSpec => {
                    sprites.define(
                        frameSpec.name,
                        ...frameSpec.rect
                    );
                });
            }
            
            if (sheetSpec.animations) {
                sheetSpec.animations.forEach(animSpec => {
                    const animation = createAnimation(animSpec.frames, animSpec.frameLength);

                    sprites.defineAnimation(animSpec.name, animation);
                });
            }

            return sprites;
        });
    });
}