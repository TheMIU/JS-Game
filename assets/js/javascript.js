const enemyContainer = document.getElementById("enemyContainer");

///////////////////////////////////////////
let enemies = 0;

// Function to spawn a new div every 1 second
let spawner;

function spawnDivEverySecond() {
    spawner = setInterval(spawnNewEnemy, 1000);
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

        // Delete div is in center (animation finished)
        setTimeout(() => {
            lives--;
            this.preview.remove();
        }, 6000);

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

        const xValues = [0,viewportWidth-100];
        const yValues = [0,viewportHeight-100];

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
// Update score and lives
const scoreElement = document.getElementById("score");
const livesElement = document.getElementById("lives");

let score = 0;
let lives = 5;

function updateStatus() {
    checkGameStatus();
    scoreElement.textContent = String(score);
    livesElement.textContent = String(lives);
}

// player fail
function checkGameStatus() {
    console.log(lives);
    if (lives <= 0) {
        console.log("failed");
        clearInterval(spawner);

        start.style.display = "none";
        game.style.display = "none";
        failed.style.display = "block";
    }
}
