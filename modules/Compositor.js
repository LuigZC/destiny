export default class Compositor {
    constructor() {
        this.layers = [];
    }

    draw(context, camera) {
        for (const layer of this.layers) {
            layer(context, camera);
        }
    }
}