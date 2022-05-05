import Vector2 from "../math/Vector2.js";
import {crossMultiplication} from "../destiny.js";

const RELEASED = 0;
const PRESSED = 1;

export default class Mouse {
    constructor() {
        this.canvas = null;
        this.canvasPosition = new Vector2();
        this.position = new Vector2();
        this.controllerMap = new Map();
    }

    convertPosition({x, y}) {
        const heightGame = this.canvas.height;
        const widthGame = this.canvas.width;
        const heightScreen = window.innerHeight;
        const widthScreen = heightScreen*(this.canvas.width/this.canvas.height);

        this.position.set(
            Math.floor(crossMultiplication(x, widthScreen, widthGame)),
            Math.floor(crossMultiplication(y, heightScreen, heightGame))
        );

        return this.position;
    }

    addMapping(name, callback) {
        this.controllerMap.set(name, callback);
    }

    handleEvent(event) {
        this.canvasPosition.set(event.offsetX, event.offsetY);
        this.convertPosition(this.canvasPosition);

        this.controllerMap.forEach((callback, name) => {
            callback(event.which, event.type);
        });
    }

    listenTo(canvas) {
        this.canvas = canvas;

        this.canvas.addEventListener("contextmenu", event => {
            event.preventDefault();
        });

        ["mousedown", "mousemove"].forEach(eventType => {
            this.canvas.addEventListener(eventType, event => {
                this.handleEvent(event);
            });
        });
    }
}