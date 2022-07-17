import SpriteSheet from "../SpriteSheet.js";
import {createAnimation} from "../../destiny.js";
import {loadImage} from "./loadImage.js";
import {loadJSON} from "./loadJSON.js";

export function loadSpriteSheet(url) {
    return loadJSON(url).then(sheetSpec => {
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
                for (const tileSpec of sheetSpec.tiles) {
                    sprites.defineTile(
                        tileSpec.name,
                        tileSpec.index[0],
                        tileSpec.index[1]
                    );
                }
            }
            if (sheetSpec.frames) {
                for (const frameSpec of sheetSpec.frames) {
                    sprites.define(
                        frameSpec.name,
                        ...frameSpec.rect
                    );
                }
            }
            
            if (sheetSpec.animations) {
                for (const animSpec of sheetSpec.animations) {
                    const animation = createAnimation(animSpec.frames, animSpec.frameLength);

                    sprites.defineAnimation(animSpec.name, animation);
                }
            }

            return sprites;
        });
    });
}