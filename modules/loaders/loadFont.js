import SpriteSheet from "../SpriteSheet.js";
import Font from "../Font.js";
import {loadImage} from "./loadImage.js";

const CHARACTERS = " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";

export function loadFont(url, sizeX = 8, sizeY = 8) {
    return loadImage(url).then(image => {
        const fontSprite = new SpriteSheet(image);
        const rowLength = image.width;

        for (let [index, character] of [...CHARACTERS].entries()) {
            const x = index*sizeX%rowLength;
            const y = Math.floor(index*sizeY/rowLength)*sizeY;

            fontSprite.define(
                character,
                x, y,
                sizeX, sizeY
            );
        }

        return new Font(fontSprite, sizeX, sizeY);
    });
}