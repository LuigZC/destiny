import Vector2 from "./math/Vector2.js";

export default class Entity {
    constructor() {        
        this.position = new Vector2();
        this.velocity = new Vector2();
    }
}