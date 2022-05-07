export function createCollisionLayer(room) {
    const resolvedTiles = [];
    const tileResolver = room.tileCollider.tiles;
    const tileSize = tileResolver.tileSize;
    const getByIndexOriginal = tileResolver.getByIndex;

    tileResolver.getByIndex = function getByIndexFake(x, y) {
        resolvedTiles.push({x, y});

        return getByIndexOriginal.call(tileResolver, x, y);
    }

    return function drawCollision(context, camera) {
        context.strokeStyle = "blue";
        resolvedTiles.forEach(({x, y}) => {
            context.beginPath();
            context.rect(
                x*tileSize - camera.position.x,
                y*tileSize - camera.position.y,
                tileSize,
                tileSize
            );
            context.stroke();
        });

        context.strokeStyle = "red";
        room.entities.forEach(entity => {
            context.beginPath();
            context.rect(
                entity.bounds.left - camera.position.x,
                entity.bounds.top - camera.position.y,
                entity.size.x,
                entity.size.y
            );
            context.stroke();
        });

        resolvedTiles.length = 0;
    }
}