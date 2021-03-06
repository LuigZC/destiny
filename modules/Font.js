import Vector2 from "./math/Vector2.js";

export default class Font {
    constructor(sprites, sizeX, sizeY) {
        this.sprites = sprites;
        this.size = new Vector2(sizeX, sizeY);
    }

    print(text, context, x, y) {
        for (const [position, character] of [...text].entries()) {
            this.sprites.draw(
                character,
                context,
                x + position*this.size.x,
                y
            );
        }
    }
}