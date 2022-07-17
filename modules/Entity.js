import BoundingBox from "./BoundingBox.js";
import AudioBoard from "./AudioBoard.js";
import Vector2 from "./math/Vector2.js";

export default class Entity {
    constructor() {
        this.position = new Vector2();
        this.velocity = new Vector2();
        this.size = new Vector2();
        this.offset = new Vector2();
        this.bounds = new BoundingBox(this.position, this.size, this.offset);
        this.audio = new AudioBoard();
        this.sounds = new Set();
        this.canCollide = true;
        this.lifeTime = 0;
        this.traits = [];
    }

    addTrait(trait) {
        this.traits.push(trait);
        this[trait.NAME] = trait;
    }

    playSound(name) {
        this.sounds.add(name);
    }

    collides(canditate) {
        for (const trait of this.traits) {
            trait.collides(this, canditate);
        }
    }

    obstruct(side, match) {
        for (const trait of this.traits) {
            trait.obstruct(this, side, match);
        }
    }

    playSounds(audioBoard, audioContext) {
        for (const name of this.sounds) {
            audioBoard.play(name, audioContext);
        }

        this.sounds.clear();
    }

    draw() {

    }

    finalize() {
        for (const trait of this.traits) {
            trait.finalize();
        }
    }

    update(gameContext, room) {
        for (const trait of this.traits) {
            trait.update(this, gameContext, room);
        }

        this.playSounds(this.audio, gameContext.audioContext);

        this.lifeTime += gameContext.deltaTime;
    }
}