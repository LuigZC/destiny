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
    
    *entries() {
        for (const [x, column] of this.grid.entries()) {
            for (const [y, value] of column.entries()) {
                yield [x, y, value];
            }
        }
    }
}
