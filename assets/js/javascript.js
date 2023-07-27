const insectContainer = document.getElementById("insectContainer");
const target = document.getElementById("target");

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

    deleteOnClick() {
        // Delete div if mouse clicked
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

// Generate and append 20 random-colored divs to the container
for (let i = 0; i < 20; i++) {
    const randomColor = getRandomColor();
    const insect = new Insect("Insect" + (i + 1), 100, 10, 0, 5, randomColor);
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

