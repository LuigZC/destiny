export function loadJSON(url) {
    return fetch(url).then(result => result.json());
}