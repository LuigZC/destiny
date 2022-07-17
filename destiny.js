import Velocity from "./modules/traits/Velocity.js";
import SpriteSheet from "./modules/SpriteSheet.js";
import Keyboard from "./modules/input/Keyboard.js";
import Gravity from "./modules/traits/Gravity.js";
import Physics from "./modules/traits/Physics.js";
import Emitter from "./modules/traits/Emitter.js";
import Compositor from "./modules/Compositor.js";
import AudioBoard from "./modules/AudioBoard.js";
import Vector2 from "./modules/math/Vector2.js";
import Matrix from "./modules/math/Matrix.js";
import Solid from "./modules/traits/Solid.js";
import Mouse from "./modules/input/Mouse.js";
import Camera from "./modules/Camera.js";
import Entity from "./modules/Entity.js";
import Timer from "./modules/Timer.js";
import Trait from "./modules/Trait.js";
import Room from "./modules/Room.js";
import {loadSpriteSheet} from "./modules/loaders/loadSpriteSheet.js";
import {createAudioLoader} from "./modules/loaders/loadAudio.js";
import {createRoomLoader} from "./modules/loaders/loadRoom.js";
import {loadAudioBoard} from "./modules/loaders/loadAudio.js";
import {loadImage} from "./modules/loaders/loadImage.js";
import {loadFont} from "./modules/loaders/loadFont.js";
import {loadJSON} from "./modules/loaders/loadJSON.js";

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
    AudioBoard,
    Camera,
    Compositor,
    Emitter,
    Entity,
    Gravity,
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
    Velocity,
    Sides,
    createAnimation,
    createAudioLoader,
    createCanvas,
    createGameCanvas,
    createRoomLoader,
    crossMultiplication,
    loadAudioBoard,
    loadFont,
    loadImage,
    loadJSON,
    loadSpriteSheet
};