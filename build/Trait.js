export default class Trait {
    constructor(name) {
        this.NAME = name;
    }

    obstruct() {

    }

    update() {
        console.warn("Unhandled update call in Trait");
    }
}