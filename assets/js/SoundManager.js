//////////////// Sounds
let bgMusicAudio = new Audio("assets/sounds/BGMusic.mp3");

function playRandomGhostSound() {
    const audioFiles = [
        "assets/sounds/GhostDeath1.wav",
        "assets/sounds/GhostDeath2.wav",
        "assets/sounds/GhostDeath3.wav"
    ];

    const randomIndex = Math.floor(Math.random() * audioFiles.length);
    const randomSound = new Audio(audioFiles[randomIndex]);
    randomSound.play();
}

function playBGMusic() {
    bgMusicAudio.loop = true;
    bgMusicAudio.volume = 0.2;
    bgMusicAudio.play();
}

function stopBgMusic() {
    if (bgMusicAudio) {
        bgMusicAudio.pause();
    }
}
