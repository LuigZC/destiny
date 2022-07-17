export default class TileResolver {
    constructor(matrix, tileSize = 16) {
        this.matrix = matrix;
        this.tileSize = tileSize;
    }

    toIndex(position) {
        return Math.floor(position/this.tileSize);
    }

    *toIndexRange(position1, position2) {
        const positionMax = Math.ceil(position2/this.tileSize)*this.tileSize;
        let position = position1;

        do {
            yield this.toIndex(position);

            position += this.tileSize;
        } while (position < positionMax)
    }

    getByIndex(indexX, indexY) {
        const tile = this.matrix.get(indexX, indexY);

        if (tile) {
            const x1 = indexX*this.tileSize;
            const x2 = x1 + this.tileSize;
            const y1 = indexY*this.tileSize;
            const y2 = y1 + this.tileSize;

            return {
                tile,
                x1, x2,
                y1, y2
            };
        }
    }

    searchByPosition(x, y) {
        return this.getByIndex(
            this.toIndex(x),
            this.toIndex(y)
        );
    }

    *searchByRange(x1, x2, y1, y2) {
        for (const indexX of this.toIndexRange(x1, x2)) {
            for (const indexY of this.toIndexRange(y1, y2)) {
                const match = this.getByIndex(indexX, indexY);

                if (match) yield match;
            }
        }
    }
}