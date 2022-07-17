export default class EventEmitter {
    constructor() {
        this.listeners = [];
    }

    listen(name, callback) {
        const listener = {name, callback};

        this.listeners.push(listener);
    }

    emit(name, ...args) {
        for (const listener of this.listeners) {
            if (listener.name === name) {
                listener.callback(...args);
            }
        }
    }
}