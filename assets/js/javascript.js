const insectContainer = document.getElementById("insectContainer");

///////////////////////////////////////////
let insectCount = 0;

// Function to spawn a new div every 1 second
let spawner;
function spawnDivEverySecond() {
    spawner = setInterval(spawnNewInsect, 1000);
}

function spawnNewInsect() {
    console.log('created new insect');

    const randomColor = getRandomColor();
    const insect = new Insect("Insect" + (insectCount + 1), 100, 10, 0, 5, randomColor);

    // Animate the div to the center
    insect.preview.animate(getCenter(insect.preview), 6000);

    insectContainer.appendChild(insect.preview);
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

class Insect {
    constructor(name, health, damage, score, speed, preview) {
        this.name = name;
        this.health = health;
        this.damage = damage;
        this.score = score;
        this.speed = speed;
        this.preview = this.createPreviewDiv(preview);
        this.randomizePosition(); // Set random initial position
    }

    createPreviewDiv(preview) {
        const div = document.createElement("div");
        div.classList.add("insect");
        div.style.backgroundColor = preview;

        // Delete div if mouse clicked
        div.addEventListener("click", () => {
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
        // Set random position within the specified area (width: 500px, height: 400px)
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        const randomX = Math.floor(Math.random() * (viewportWidth));
        const randomY = Math.floor(Math.random() * (viewportHeight));


        console.log(viewportWidth + " , " + viewportHeight);
        console.log(randomX + " , " + randomY);

        this.preview.style.left = randomX + "px";
        this.preview.style.top = randomY + "px";
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
