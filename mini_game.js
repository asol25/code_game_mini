const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

let para = document.querySelector('p');
let index = 0;

/* this is function random return number to min - max */
function random(min, max) {
    return Math.floor(Math.random() * max) + min;
}

/* this is function random color return range to 0 to 255 */
function randomRGB() {
    return `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`;
}

/* A Ball create with:
 x: horizontal on screen
 y: vertical on screen
 exists: to check ball have exists
 */
function Balls(x, y, speedsX, speedsY, size, colorBalls, exists) {
    this.x = x;
    this.y = y;
    this.speedsX = speedsX;
    this.speedsY = speedsY;
    this.colorBalls = colorBalls;
    this.size = size;
    this.exists = exists;
}

/* draw a ball */
Balls.prototype.draw = function () {
    ctx.beginPath();
    ctx.fillStyle = this.colorBalls;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
}

/* Function caculate collision Delection of Ball with max-width and max-height
when x is center of balls + size, we have a Ball compele and when Ball move width affter
go to outside width, we will reverse horizontal, height also do is this way. 
*/
Balls.prototype.collisionCorner = function () {
    if ((this.x + this.size) >= width) {
        this.speedsX = -(this.speedsX);
    }

    if ((this.y + this.size) >= height) {
        this.speedsY = -(this.speedsY);
    }

    if ((this.x + this.size) <= 0 + this.size) {
        this.speedsX = -(this.speedsX);
    }
    if ((this.y + this.size) <= 0 + this.size) {
        this.speedsY = -(this.speedsY);
    }
    this.x += this.speedsX;
    this.y += this.speedsY;
}
/* Calculator distance when collision deletection between Ball[0] to Ball[1]
algorithm work centre points of the two circles and ensuring the distance between the centre 
points are less than the two radii added together.
*/

/* When balls collision the Ball exists will get a raise size */
Balls.prototype.collisionBalls = function () {
    for (const checkBalls of ballStore) {
        if (!(this === checkBalls) && checkBalls.exists) {
            let dx = this.x - checkBalls.x;
            let dy = this.y - checkBalls.y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.size + checkBalls.size) {
                index--;
                para.textContent = 'Ball count: ' + index;
                checkBalls.exists = this.checkBalls = false;
                checkBalls.size = this.size += 10;
            }
        }
    }
}

const ballStore = [];

function createBalls() {
    const size = random(10, 30);
    while (ballStore.length < 10) {
        let ball = new Balls(random(0 + size, width - size),
            random(0 + size, height - size), random(-10, 10),
            random(-10, 10), size, randomRGB(), true);
        ballStore.push(ball);
        index++;
    }
    para.textContent = 'Ball count: ' + index;

}

function loop() {
    createBalls();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0, 0, width, height);

    for (const iterator of ballStore) {
        if (iterator.exists) {
            iterator.draw();
            iterator.collisionCorner();
            iterator.collisionBalls();
        }
    }
    requestAnimationFrame(loop);
}

loop();