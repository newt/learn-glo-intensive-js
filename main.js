const score = document.querySelector('.score');
const start = document.querySelector('.start');
const startButton = document.querySelector('.start button');
const gameArea = document.querySelector('.gameArea');
const car = document.createElement('div');

const musicCheck = document.querySelector('#music-check');
const music = document.createElement('audio');

car.classList.add('car');

startButton.addEventListener('click', startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);

const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false
}

const setting = {
    start: false,
    score: 0,
    speed: 3,
    traffic: 3
}

function getQuantityElements(heightElement) {
    return document.documentElement.clientHeight / heightElement + 1;
}

function startGame() {
    start.classList.add('hide');

    for (let i = 0; i < getQuantityElements(100); i++) {
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.top = (i * 100) + 'px';
        line.y = i * 100;
        gameArea.appendChild(line);
    }

    for (let i = 0; i < getQuantityElements(100 * setting.traffic); i++) {
        const enemy = document.createElement('div');
        let enemyImg = Math.floor(Math.random() * (3 - 1 + 1) + 1);
        enemy.classList.add('enemy');
        enemy.y = -100 * setting.traffic * (i + 1);
        enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
        enemy.style.top = enemy.y + 'px';
        enemy.style.background = `transparent url(./image/enemy${enemyImg}.png) center / cover no-repeat`;
        gameArea.appendChild(enemy);
    }

    setting.start = true;
    gameArea.appendChild(car);

    /**
     * используем audio для зацикливания фрагмента
     * embed так не умеет
     */
    if (musicCheck.checked) {
        music.setAttribute('src', './music/loop.mp3');
        music.setAttribute('type', 'audio/mp3');
        music.setAttribute('loop', 'loop');
        music.setAttribute('autoplay', true);
    }

    setting.x = car.offsetLeft;
    setting.y = car.offsetTop;

    requestAnimationFrame(playGame)
}

function playGame() {
    moveRoad();
    moveEnemy();
    if (setting.start) {
        if (keys.ArrowLeft && setting.x > 0) {
            setting.x -= setting.speed;
        }
        if (keys.ArrowRight && setting.x < (gameArea.offsetWidth - car.offsetWidth)) {
            setting.x += setting.speed;
        }
        if (keys.ArrowUp && setting.y > 0) {
            setting.y -= setting.speed;
        }
        if (keys.ArrowDown && setting.y < (gameArea.offsetHeight - car.offsetHeight)) {
            setting.y += setting.speed;
        }

        car.style.left = setting.x + 'px';
        car.style.top = setting.y + 'px';

        requestAnimationFrame(playGame);
    }
}

function startRun(event) {
    event.preventDefault();
    if (event.key in keys) {
        keys[event.key] = true;
    }
}

function stopRun(event) {
    event.preventDefault();
    if (event.key in keys) {
        keys[event.key] = false;
    }
}

function moveRoad() {
    let lines = document.querySelectorAll('.line');
    lines.forEach(function (line) {
        line.y += setting.speed;
        line.style.top = line.y + 'px';

        if (line.y > document.documentElement.clientHeight) {
            line.y = -100;
        }
    });
}

function moveEnemy() {
    let enemies = document.querySelectorAll('.enemy');
    enemies.forEach(function (enemy) {
        enemy.y += setting.speed / 2;
        enemy.style.top = enemy.y + 'px';

        if (enemy.y >= document.documentElement.clientHeight) {
            enemy.y = -100 * setting.traffic;
            enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
        }
    });
}
