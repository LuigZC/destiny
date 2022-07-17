import AudioBoard from "../AudioBoard.js";
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

        for (const name of Object.keys(sfx)) {
            const {url} = sfx[name];

            const processed = loadAudio(url).then(buffer => {
                audioBoard.add(name, buffer);
            });

            processes.push(processed);
        }

        return Promise.all(processes).then(() => {
            return audioBoard;
        });
    });
}