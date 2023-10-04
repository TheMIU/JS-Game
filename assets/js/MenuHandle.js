let start = document.getElementById("start");
let game = document.getElementById("game");
let failed = document.getElementById("failed");
let btnPlay = document.getElementById("btnPlay");
let btnRestart = document.getElementById(`btnRestart`);
let btnBackToMenu = document.getElementById(`btnBackToMenu`);

// begin
start.style.display = "block";
game.style.display = "none";
failed.style.display = "none";

// start
btnPlay.addEventListener("click", function () {
    spawnDivEverySecond();
    start.style.display = "none";
    game.style.display = "block";
    failed.style.display = "none";
});

// restart
btnRestart.addEventListener("click", function () {
    score = 0;
    lives = 5;

    // clear all divs named "enemy" in DOM
    const enemies = document.querySelectorAll(".enemy");
    enemies.forEach(function (enemy) {
        enemy.remove();
    });

    clearInterval(spawner);
    spawnDivEverySecond();
    start.style.display = "none";
    game.style.display = "block";
    failed.style.display = "none";
});

btnBackToMenu.addEventListener("click", function () {
    location.reload();
});