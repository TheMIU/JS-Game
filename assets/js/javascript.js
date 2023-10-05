const enemyContainer = document.getElementById("enemyContainer");

///////////////////////////////////////////
let enemies = 0;


//spawn a new div every 'timeout' second
let spawner;

function spawnDivEverySecond(timeout) {
    if (spawner) {
        clearInterval(spawner);
    }
    spawner = setInterval(spawnNewEnemy, timeout);
}


function spawnNewEnemy() {
    console.log('created new enemy');

    const randomColor = getRandomColor();
    const enemy = new Enemy(randomColor);

    // Animate the div to the center
    enemy.preview.animate(getCenter(enemy.preview), 6000);

    enemyContainer.appendChild(enemy.preview);
}

// Function to generate a random color
function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

///////////////////////////////////////////

class Enemy {
    constructor(color) {
        this.preview = this.createPreviewDiv(color);
        this.randomizePosition(); // Set random initial position
    }

    createPreviewDiv(preview) {
        const div = document.createElement("div");
        div.classList.add("enemy");
        div.style.backgroundColor = preview;

        // Delete div if mouse clicked
        div.addEventListener("mouseover", () => {
            this.deleteDiv();
            score++;
            updateStatus();
        });

        /*// Delete div is in center (animation finished)
        setTimeout(() => {
            this.preview.remove();

            // player fail
            console.log("failed");
            clearInterval(spawner);

            start.style.display = "none";
            game.style.display = "none";
            failed.style.display = "block";

        }, 6000);*/

        updateStatus();

        return div;
    }

    // Delete div
    deleteDiv() {
        this.preview.remove();
    }

    randomizePosition() {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        const xValues = [0, viewportWidth - 100];
        const yValues = [0, viewportHeight - 100];

        let randomIndexX = Math.floor(Math.random() * xValues.length);
        let randomIndexY = Math.floor(Math.random() * yValues.length);

        let xPosition = xValues[randomIndexX];
        let yPosition = yValues[randomIndexY];

        this.preview.style.left = xPosition + "px";
        this.preview.style.top = yPosition + "px";
    }
}

function getCenter(div) {
    // Calculate the center coordinates of the container
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const divWidth = div.clientWidth;
    const divHeight = div.clientHeight;
    const centerX = (viewportWidth - divWidth) / 2;
    const centerY = (viewportHeight - divHeight) / 2;

    //console.log(centerX+" , "+centerY)

    return {left: centerX + "px", top: centerY + "px"};
}

///////////////////////////////////////////
// Update score and level
const scoreElement = document.getElementById("score");
const levelElement = document.getElementById("level");

let score = 0;
let level = 'Level 1';

function updateStatus() {
    scoreElement.textContent = String(score);
    levelElement.textContent = level;
    updateLevel();
    updateDifficulty();
}

function updateLevel() {
    switch (true) {
        case score < 5:
            level = 'Level 1';
            break;
        case score < 10:
            level = 'Level 2';
            break;
        case score < 15:
            level = 'Level 3';
            break;
        case score < 20:
            level = 'Level 4';
            break;
        case score < 25:
            level = 'Level 5';
            break;
    }
}

function updateDifficulty() {
    switch (true) {
        case level === 'Level 1':
            spawnDivEverySecond(2000);
            break;
        case score < 10:
            level = 'Level 2';
            spawnDivEverySecond(1000);
            break;
        case score < 15:
            level = 'Level 3';
            spawnDivEverySecond(800);
            break;
        case score < 20:
            level = 'Level 4';
            spawnDivEverySecond(500);
            break;
        case score < 25:
            level = 'Level 5';
            spawnDivEverySecond(300);
            break;
        case score < 50:
            level = 'Level 6';
            spawnDivEverySecond(200);
            break;
        case score < 100:
            level = 'Level 7';
            spawnDivEverySecond(100);
            break;
        case score < 200:
            level = 'Level 8';
            spawnDivEverySecond(50);
            break;
    }
}

///////////
function checkEnemyPosition() {
    const enemyDiv = document.querySelector(".enemy");
    if (enemyDiv) {
        const enemyRect = enemyDiv.getBoundingClientRect();
        const viewportCenterX = window.innerWidth / 2;
        const viewportCenterY = window.innerHeight / 2;

        // Check if the enemy div's center is within a certain range of the viewport center
        if (
            Math.abs(enemyRect.left + enemyRect.width / 2 - viewportCenterX) < 50 &&
            Math.abs(enemyRect.top + enemyRect.height / 2 - viewportCenterY) < 50
        ) {
            // Game over
            console.log("Game Over");

            start.style.display = "none";
            game.style.display = "none";
            failed.style.display = "block";

            return;
        }
    }

    // Continue checking in the next animation frame
    requestAnimationFrame(checkEnemyPosition);
}

// Start checking enemy position
checkEnemyPosition();
