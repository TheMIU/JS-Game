let start = document.getElementById("start");
let game = document.getElementById("game");
let failed = document.getElementById("failed");
let btnPlay = document.getElementById("btnPlay");
let btnRestart = document.getElementById(`btnRestart`);

let isGameStarted = false;

// begin
start.style.display = "block";
game.style.display = "none";
failed.style.display = "none";

// start
btnPlay.addEventListener("click", function () {
    isGameStarted = true;
    if (isGameStarted) {
        spawnDivEverySecond();
    }
    start.style.display = "none";
    game.style.display = "block";
    failed.style.display = "none";
});

// restart
btnRestart.addEventListener("click", function () {
    location.reload();
});