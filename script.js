let canvas = document.getElementById("canvas");
let w = canvas.width = window.innerWidth;
let h = canvas.height = window.innerHeight;
let c = init("canvas");
let mouse = { x: 0, y: 0 };
let last_mouse = { x: 0, y: 0 };
class firefly {
    constructor(x, y, s, ang, v) {
        this.x = x;
        this.y = y;
        this.s = s;
        this.ang = ang;
        this.v = v;
    }

    move() {
        this.x += this.v * Math.cos(this.ang);
        this.y += this.v * Math.sin(this.ang);
        this.ang += (Math.random() * 20 * Math.PI / 180) - (10 * Math.PI / 180);
    }

    show() {
        c.beginPath();
        c.arc(this.x, this.y, this.s, 0, 2 * Math.PI);
        c.fillStyle = "#eaf4fc";
        c.fill();
    }
}

let f = [];

function createFireflies() {
    if (f.length < 100) {
        for (let j = 0; j < 10; j++) {
            f.push(new firefly(
                Math.random() * w,
                Math.random() * h,
                Math.random() * 2,
                Math.random() * 2 * Math.PI,
                Math.random() * 2
            ));
        }
    }
}

function draw() {
    c.clearRect(0, 0, w, h);
    createFireflies();
    //animation
    for (let i = 0; i < f.length; i++) {
        f[i].move();
        f[i].show();
        if (f[i].x < 0 || f[i].x > w || f[i].y < 0 || f[i].y > h) {
            f.splice(i, 1);
        }
    }
}

function init(elemid) {
    let canvas = document.getElementById(elemid),
        c = canvas.getContext("2d");
    c.fillStyle = "rgba(30,30,30,1)";
    c.fillRect(0, 0, w, h);
    return c;
}

function resizeCanvas() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    c = init("canvas");
    draw();
}

function handleMouseMove(e) {
    last_mouse.x = mouse.x;
    last_mouse.y = mouse.y;

    mouse.x = e.pageX - canvas.offsetLeft;
    mouse.y = e.pageY - canvas.offsetTop;
}

canvas.addEventListener("mousemove", handleMouseMove, false);

window.addEventListener("resize", function () {
    resizeCanvas();
});

function animate() {
    draw();
    requestAnimationFrame(animate);
}

animate();


const playButton = document.getElementById('playButton');
const audio = document.getElementById('player');
const volumeInput = document.getElementById('audioVolume');
const output = document.querySelector('output');

const dynamicRow = document.querySelectorAll(".audio_val_1 i");

playButton.addEventListener('click', function() {
    if (audio.paused) {
        this.classList.add('active');
        audio.play();
    } else {
        this.classList.remove('active');
        audio.pause();
    }
});

volumeInput.addEventListener('input', function() {
    audio.volume = parseFloat(this.value);
    output.textContent = this.value;

    let num = + this.value*10;
    dynamicRow.forEach((element, index) => {
        if (index >= num) {
            element.classList.add('hidden');
        } else {
            element.classList.remove('hidden');
        }
    });


});


