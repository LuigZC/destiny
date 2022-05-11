import SpriteSheet from "./build/SpriteSheet.js";
import Compositor from "./build/Compositor.js";
import Keyboard from "./input/Keyboard.js";
import Physics from "./traits/Physics.js";
import Vector2 from "./math/Vector2.js";
import Camera from "./build/Camera.js";
import Entity from "./build/Entity.js";
import Matrix from "./math/Matrix.js";
import Solid from "./traits/Solid.js";
import Mouse from "./input/Mouse.js";
import Timer from "./build/Timer.js";
import Trait from "./build/Trait.js";
import Room from "./build/Room.js";
import {loadSpriteSheet} from "./loaders/loadSpriteSheet.js";
import {createRoomLoader} from "./loaders/loadRoom.js";
import {loadImage} from "./loaders/loadImage.js";
import {loadFont} from "./loaders/loadFont.js";
import {loadJSON} from "./loaders/loadJSON.js";

const Sides = {
    TOP: Symbol("top"),
    BOTTOM: Symbol("bottom"),
    LEFT: Symbol("left"),
    RIGHT: Symbol("right")
}

function createAnimation(frames, frameLength) {
    return function resolveFrame(distance) {
        const frameIndex = Math.floor(distance/frameLength) % frames.length;
        const frameName = frames[frameIndex];

        return frameName;
    }
}

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
    Physics,
    Room,
    Solid,
    SpriteSheet,
    Timer,
    Trait,
    Vector2,
    Sides,
    createAnimation,
    createCanvas,
    createGameCanvas,
    createRoomLoader,
    crossMultiplication,
    loadFont,
    loadImage,
    loadJSON,
    loadSpriteSheet
};