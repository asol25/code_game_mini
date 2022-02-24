const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;


function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomRGB() {
    return `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`;
}

function Balls(x, y, speedsX, speedsY, size, colorBalls) {
    this.x = x;
    this.y = y;
    this.speedsX = speedsX;
    this.speedsY = speedsY;
    this.colorBalls = colorBalls;
    this.size = size;

    Balls.prototype = draw;
    Balls.prototype.constructor = Balls;

    Balls.prototype.draw = function () {
        ctx.beginPath();
        ctx.fillStyle = colorBalls;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
    // collisionBalls(x, y, speedsX, speedsY, size);
}

// function collisionBalls(x, y, speedsX, speedsY, size) {
//     if ((x + size) >= width) {
//         speedsX = -(speedsX);
//     }

//     if ((y + size) >= height) {
//         speedsY = -(speedsY);
//     }

//     if ((x + size) <= width - width + size) {
//         speedsX = -(speedsX);
//     }
//     if ((y + size) <= 0 + size) {
//         speedsY = -(speedsY);
//     }

//     x += speedsX;
//     y += speedsY;
//     console.log("3")
// }
// ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
// ctx.fillRect(0, 0, width, height);
// const size = random(10, 30);
// let ball = new Balls(random(0 + size, width - size), random(0 + size, width - size), random(-10, 10), random(-10, 10), size, ramdomRGB());
// ball.draw();

const ballStore = [];
function createBalls() {
    const size = random(10, 30);
    console.log("4");

    while (ballStore.length < 10) {
        let ball = new Balls(random(0 + size, width - size),
            random(0 + size, height - size), random(-10, 10),
            random(-10, 10), size, randomRGB());
        ballStore.push(ball);
    }
}

function loop() {
    createBalls();
    console.log("3")
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0, 0, width, height);

    for (const iterator of ballStore) {
        iterator.draw();
    }

}

loop();