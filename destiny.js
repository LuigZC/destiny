import SpriteSheet from "./build/SpriteSheet.js";
import Compositor from "./build/Compositor.js";
import Keyboard from "./input/Keyboard.js";
import Vector2 from "./math/Vector2.js";
import Camera from "./build/Camera.js";
import Entity from "./build/Entity.js";
import Matrix from "./math/Matrix.js";
import Mouse from "./input/Mouse.js";
import Timer from "./build/Timer.js";
import Trait from "./build/Trait.js";
import Room from "./build/Room.js";
import {loadSpriteSheet} from "./loaders/loadSpriteSheet.js";
import {loadImage} from "./loaders/loadImage.js";
import {loadJSON} from "./loaders/loadJSON.js";
import {loadRoom} from "./loaders/loadRoom.js";

function createCanvas(width, height) {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    
    return canvas;
}

function createGameCanvas(width, height, specs = {}) {
    const canvas = createCanvas(width, height);
    canvas.style.imageRendering = specs.imageRendering ? specs.imageRendering : "auto";
    
    if (specs.fullScreen) {
        canvas.style.height = "100vh";
        canvas.style.position = "absolute";
        canvas.style.top = "50%";
        canvas.style.left = "50%";
        canvas.style.transform = "translate(-50%,-50%)";
    }

    return canvas;
}

function crossMultiplication(n1, n2, n3) {
    return n1*n3/n2;
}

export {
    Camera,
    Compositor,
    Entity,
    Keyboard,
    Matrix,
    Mouse,
    Room,
    SpriteSheet,
    Timer,
    Trait,
    Vector2,
    createCanvas,
    createGameCanvas,
    crossMultiplication,
    loadImage,
    loadJSON,
    loadRoom,
    loadSpriteSheet
};