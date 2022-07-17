export default class Matrix {
    constructor() {
        this.grid = [];
    }

    get(x, y) {
        const column = this.grid[x];

        if (column) return column[y];

        return undefined;
    }

    set(x, y, value) {
        if (!this.grid[x]) this.grid[x] = [];

        this.grid[x][y] = value;
    }

    delete(x, y) {
        const column = this.grid[x];

        if (column) delete column[y];
    }

    *entries() {
        for (const [x, column] of this.grid.entries()) {
            for (const [y, tile] of column.entries()) {
                yield [x, y, tile];
            }
        }
    }
}