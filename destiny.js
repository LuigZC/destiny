import SpriteSheet from "./build/SpriteSheet.js";
import Vector2 from "./build/math/Vector2.js";
import Entity from "./build/Entity.js";
import {loadImage} from "./build/loaders/loadImage.js";

function createImageBuffer() {
    return document.createElement("canvas");
}

export {
    createImageBuffer,
    loadImage,
    Entity,
    SpriteSheet,
    Vector2
};