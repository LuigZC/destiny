export function loadJSON(url) {
    return fetch(url).then(result => {
        return result.json();
    });
}