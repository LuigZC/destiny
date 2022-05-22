function createEntityLayer(entities) {
    return function drawBoundingBox(context, camera) {
        context.strokeStyle = "red";
        entities.forEach(entity => {
            context.beginPath();
            context.translate(.5, .5);
            context.rect(
                entity.bounds.left - camera.position.x,
                entity.bounds.top - camera.position.y,
                entity.size.x - 1,
                entity.size.y - 1
            );
            context.translate(-.5, -.5);
            context.stroke();
        });
    }
}

function createTileCadidateLayer(tileCollider) {
    const resolvedTiles = [];
    const tileResolver = tileCollider.tiles;
    const tileSize = tileResolver.tileSize;
    const getByIndexOriginal = tileResolver.getByIndex;

    tileResolver.getByIndex = function getByIndexFake(x, y) {
        resolvedTiles.push({x, y});

        return getByIndexOriginal.call(tileResolver, x, y);
    }

    return function drawTileCandidates(context, camera) {
        context.strokeStyle = "blue";
        resolvedTiles.forEach(({x, y}) => {
            context.beginPath();
            context.translate(.5, .5);
            context.rect(
                x*tileSize - camera.position.x,
                y*tileSize - camera.position.y,
                tileSize - 1,
                tileSize - 1
            );
            context.translate(-.5, -.5);
            context.stroke();
        });

        resolvedTiles.length = 0;
    }
}

export function createCollisionLayer(room) {
    const drawTileCandidates = createTileCadidateLayer(room.tileCollider)
    const drawBoundingBox = createEntityLayer(room.entities);

    return function drawCollision(context, camera) {
        drawTileCandidates(context, camera);
        drawBoundingBox(context, camera);
    }
}