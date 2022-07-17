export default class Vector2 {
    constructor(x = 0, y = 0) {
        this.set(x, y);
    }

    angleTo(vec2) {
        return Math.atan2(
            vec2.y - this.y,
            vec2.x - this.x
        );
    }

    clone() {
        return new Vector2(this.x, this.y);
    }

    copy(vector2) {
        this.set(vector2.x, vector2.y);
    }

    distanceTo(vec2) {
        return Math.sqrt(
            Math.pow(this.x - vec2.x, 2) +
            Math.pow(this.y - vec2.y, 2)
        );
    }

    set(x, y) {
        this.x = x;
        this.y = y;
    }
}