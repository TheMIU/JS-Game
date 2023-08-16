const insectContainer = document.getElementById("insectContainer");
const target = document.getElementById("target");

///////////////////////////////////////////

// Spawn Insect every 1s
let insectCount = 0;
spawnDivEverySecond();

// Function to spawn a new div every 1 second
function spawnDivEverySecond() {
    setInterval(spawnNewInsect, 1000);
}

function spawnNewInsect() {
    console.log('created new insect');

    const randomColor = getRandomColor();
    const insect = new Insect("Insect" + (insectCount + 1), 100, 10, 0, 5, randomColor);

    // Animate the div to the center
    insect.preview.animate(getCenter(insect.preview), 6000);

    insectContainer.appendChild(insect.preview);
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

        div.addEventListener("click", () => {
            this.deleteOnClick();
        });

        return div;
    }

    // Delete div if mouse clicked
    deleteOnClick() {
        this.preview.remove();
    }

    randomizePosition() {
        // Set random position within the specified area (width: 500px, height: 400px)
        const viewportWidth = window.innerWidth - 100;
        const viewportHeight = window.innerHeight - 100;
        const previewWidth = this.preview.offsetWidth;
        const previewHeight = this.preview.offsetHeight;

        const randomX = Math.floor(Math.random() * (viewportWidth - previewWidth));
        const randomY = Math.floor(Math.random() * (viewportHeight - previewHeight));

        this.preview.style.left = randomX + "px";
        this.preview.style.top = randomY + "px";
    }
}