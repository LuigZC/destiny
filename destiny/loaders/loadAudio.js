import AudioBoard from "../build/AudioBoard.js";
import {loadJSON} from "./loadJSON.js";

export function createAudioLoader(context) {
    return function loadAudio(url) {
        return fetch(url).then(response => {
            return response.arrayBuffer();
        }).then(arrayBuffer => {
            return context.decodeAudioData(arrayBuffer);
        });
    }
}

export function loadAudioBoard(url, audioContext) {
    const loadAudio = createAudioLoader(audioContext);
    
    return loadJSON(url).then(audioSheet => { //TODO
        const audioBoard = new AudioBoard(audioContext);
        const {sfx} = audioSheet;
        const processes = [];

        Object.keys(sfx).forEach(name => {
            const {url} = sfx[name];

            const processed = loadAudio(url).then(buffer => {
                audioBoard.add(name, buffer);
            });

            processes.push(processed);
        });

        return Promise.all(processes).then(() => {
            return audioBoard;
        });
    });
}