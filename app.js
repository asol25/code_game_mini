const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomRGB() {
    return `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`
}

class Balls {
    constructor(x, y, speedsX, speedsY, colorBalls, size) {
        this.x = x;
        this.y = y;
        this.speedsX = speedsX;
        this.speedsY = speedsY;
        this.colorBalls = colorBalls;
        this.size = size;
    }

    Draw() {
        ctx.beginPath();
        ctx.fillStyle = this.colorBalls;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }

    Move() {
        this.x += this.speedsX;
        this.y += this.speedsY
    }

    collisionCorner() {
        if ((this.x + this.size) >= width) {
            this.speedsX = -(this.speedsX);
        }

        if ((this.y + this.size) >= height) {
            this.speedsY = -(this.speedsY);
        }

        if ((this.x + this.size) <= width - width + this.size) {
            this.speedsX = -(this.speedsX);
        }
        if ((this.y + this.size) <= 0 + this.size) {
            this.speedsY = -(this.speedsY);
        }
    }

    collisionRGB() {
        for (const ball of storeBalls) {
            if (!(this === ball)) {
               const dx = this.x - ball.x;
               const dy = this.y - ball.y;
               const distance = Math.sqrt(dx * dx + dy * dy);
   
               if (distance < this.size + ball.size) {
                ball.colorBalls = this.colorBalls = randomRGB();
               }
            }
         }
    }
}

let storeBalls = [];

while (storeBalls.length < 4) {
    const size = random(25, 30);
    const ball = new Balls(
        random(0 + size, width - size), random(0 + size, height - size),
        random(-10, 10), random(-10, 10),
        randomRGB(), size
    );
    storeBalls.push(ball);
}

function withDraw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0, 0, width, height);

    for (const iterator of storeBalls) {
        iterator.Draw();
        iterator.Move();
        iterator.collisionCorner();
        iterator.collisionRGB();
    }
    requestAnimationFrame(withDraw);
}

withDraw();
