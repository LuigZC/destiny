import Vector2 from "./math/Vector2.js";

export default class BoundingBox {
    constructor(position, size, offset) {
        this.position = position;
        this.size = size;
        this.offset = offset;
    }

    overlaps(box) {
        return this.top < box.bottom
            && this.left < box.right
            && this.right > box.left
            && this.bottom > box.top;
    }

    get center() {
        return new Vector2(this.meridian, this.equator);
    }
    set center(vector2) {
        this.meridian = vector2.x;
        this.equator = vector2.y;
    }

    get meridian() {
        return this.position.x + this.offset.x + this.size.x/2;
    }
    set meridian(c) {
        this.position.x = c - (this.size.x/2 + this.offset.x);
    }

    get equator() {
        return this.position.y + this.offset.y + this.size.y/2;
    }
    set equator(c) {
        this.position.y = c - (this.size.y/2 + this.offset.y);
    }

    get top() {
        return this.position.y + this.offset.y;
    }
    set top(y) {
        this.position.y = y - this.offset.y;
    }

    get bottom() {
        return this.position.y + this.size.y + this.offset.y;
    }
    set bottom(y) {
        this.position.y = y - (this.size.y + this.offset.y);
    }

    get left() {
        return this.position.x + this.offset.x;
    }
    set left(x) {
        this.position.x = x - this.offset.x;
    }

    get right() {
        return this.position.x + this.size.x + this.offset.x;
    }
    set right(x) {
        this.position.x = x - (this.size.x + this.offset.x);
    }
}