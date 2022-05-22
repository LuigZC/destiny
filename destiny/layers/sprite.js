import {createCanvas} from "../destiny.js";

export function createSpriteLayer(entities, width = 64, height = 64) {
    const spriteBuffer = createCanvas(width, height);
    const spriteBufferContext = spriteBuffer.getContext("2d");

    return function drawSpriteLayer(context, camera) {
        entities.forEach(entity => {
            spriteBufferContext.clearRect(0, 0, width, height);

            entity.draw(spriteBufferContext);

            context.drawImage(
                spriteBuffer,
                entity.position.x - camera.position.x,
                entity.position.y - camera.position.y
            );
        });
    }
}