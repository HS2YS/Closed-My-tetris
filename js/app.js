document.addEventListener('DOMContentLoaded', () => {

    // Элементы DOM
    const startPauseButton = document.getElementById('start-pause-button');
    const scoreDisplay = document.getElementById('score');
    const levelDisplay = document.getElementById('level');

    // Константы
    const gridWidth = 10;
    const gridHeight = 20;
    const gridSize = gridWidth * gridHeight;
    const gameGrid = document.querySelector('.game-grid');
    const miniGrid = document.querySelector('.mini-grid');
    const miniGridBlocks = [];
    const miniGridWidth = 7;
    const miniGridHeight = 7;
    const miniGridSize = miniGridWidth * miniGridHeight;
    const holdButton = document.getElementById('hold-button');
    const holdGrid = document.querySelector('.hold-grid');
    const holdGridBlocks = [];
    const holdGridWidth = 7;
    const holdGridHeight = 7;
    const holdGridSize = holdGridWidth * holdGridHeight;
    const highScoreDisplay = document.getElementById('high-score');


    // Фигуры
    const tetrominoes = [
        // I
        {
            rotations: [
                [[0, 1], [0, 2], [0, 3], [0, 0]],
                [[-1, 0], [0, 0], [1, 0], [2, 0]],
            ],
            color: '#9EFC4E',
        },
        // O
        {
            rotations: [
                [[0, 0], [0, 1], [1, 0], [1, 1]],
            ],
            color: '#75FBF2',
        },
        // T
        {
            rotations: [
                [[0, 0], [0, -1], [0, 1], [1, 0]],
                [[0, 0], [-1, 0], [1, 0], [0, -1]],
                [[0, 0], [0, -1], [0, 1], [-1, 0]],
                [[0, 0], [-1, 0], [1, 0], [0, 1]],
            ],
            color: '#6098FF',
        },
        // S
        {
            rotations: [
                [[0, 0], [-1, 0], [0, -1], [1, -1]],
                [[0, 0], [0, -1], [1, 0], [1, 1]],
                // [[0, 0], [0, 1], [1, -1], [1, 0]],
                // [[0, 0], [-1, 0], [0, -1], [1, -1]],
            ],
            color: '#F64A89',
        },
        // Z
        {
            rotations: [
                [[0, 0], [-1, -1], [0, -1], [1, 0]],
                [[0, 0], [0, 1], [1, -1], [1, 0]],
                // [[0, 0], [0, -1], [1, 0], [1, 1]],
                // [[0, 0], [-1, -1], [0, -1], [1, 0]],
            ],
            color: '#BE4EFF',
        },
        // J
        {
            rotations: [
                [[0, 0], [0, -1], [0, 1], [1, -1]],
                [[0, 0], [-1, 0], [1, 0], [-1, -1]],
                [[0, 0], [0, -1], [0, 1], [-1, 1]],
                [[0, 0], [-1, 0], [1, 0], [1, 1]],
            ],
            color: '#FCF151',
        },
        // L
        {
            rotations: [
                [[0, 0], [0, -1], [0, 1], [1, 1]],
                [[0, 0], [-1, 0], [1, 0], [-1, 1]],
                [[0, 0], [0, -1], [0, 1], [-1, -1]],
                [[0, 0], [-1, 0], [1, 0], [1, -1]],
            ],
            color: '#FF393D',
        },
    ];
    
    // Переменные
    let currentTetromino;
    let currentRotation = 0;
    let currentPosition = { x: 4, y: 0 };
    let timerId;
    let isPaused = false;
    let score = 0;
    let level = 1;
    let linesCleared = 0;
    let nextTetromino = tetrominoes[Math.floor(Math.random() * tetrominoes.length)];
    let holdTetromino = null;
    let canHold = true;
    let highScore = localStorage.getItem('tetrisHighScore') || 0;
    highScoreDisplay.innerText = highScore;

    // Создание игрового поля

    for (let i = 0; i < gridSize; i++) {
        const block = document.createElement('div');
        gameGrid.appendChild(block);
    }

    // Создание мини сетки

    for (let i = 0; i < miniGridSize; i++) {
        const block = document.createElement('div');
        miniGrid.appendChild(block);
        miniGridBlocks.push(block);
    }

    for (let i = 0; i < holdGridSize; i++) {
        const block = document.createElement('div');
        holdGrid.appendChild(block);
        holdGridBlocks.push(block);
    }


    const blocks = Array.from(document.querySelectorAll('.game-grid div'));


    // Функция для создания новой фигуры
    function createNewTetromino() {
        currentTetromino = nextTetromino;
        currentRotation = 0;
        currentPosition = { x: 4, y: 0 };
        nextTetromino = tetrominoes[Math.floor(Math.random() * tetrominoes.length)];
        displayNextTetromino();
        if (!isValidMove(0, 0, currentTetromino.rotations[currentRotation])) {
            alert('Игра окончена :(');
            clearInterval(timerId);
            document.removeEventListener('keydown', control);
            startPauseButton.innerText = 'Начать новую игру';
            isPaused = true;
        } else {
            draw();
        }
    }

    displayNextTetromino();

    // Управление с клавиатуры
    
    function control(e) {
        if (e.code === 'Space') {
            startPauseGame();
        } else if (!isPaused) {
            if (e.keyCode === 37) {
                moveLeft();
            } else if (e.keyCode === 38) {
                rotate();
            } else if (e.keyCode === 39) {
                moveRight();
            } else if (e.keyCode === 40) {
                moveDown();
            } else if (e.keyCode === 96) {
                holdTetrominoFunction();
            }
        }
    }
    
    document.addEventListener('keydown', control);

    // Функции движения
    function moveLeft() {
        if (isValidMove(-1, 0, currentTetromino.rotations[currentRotation])) {
            undraw();
            currentPosition.x -= 1;
            draw();
        }
    }

    function moveRight() {
        if (isValidMove(1, 0, currentTetromino.rotations[currentRotation])) {
            undraw();
            currentPosition.x += 1;
            draw();
        }
    }

    function rotate() {
        const nextRotation = (currentRotation + 1) % currentTetromino.rotations.length;
        if (isValidMove(0, 0, currentTetromino.rotations[nextRotation])) {
            undraw();
            currentRotation = nextRotation;
            draw();
        }
    }

    function moveDown() {
        if (isValidMove(0, 1, currentTetromino.rotations[currentRotation])) {
            undraw();
            currentPosition.y += 1;
            draw();
        } else {
            freeze();
        }
    }

    function freeze() {
        currentTetromino.rotations[currentRotation].forEach(block => {
            const x = currentPosition.x + block[0];
            const y = currentPosition.y + block[1];
            const index = y * gridWidth + x;
            if (blocks[index]) {
                blocks[index].classList.add('taken');
                blocks[index].style.backgroundColor = currentTetromino.color;
            }
        });
        checkForCompletedLines();
        createNewTetromino();
        canHold = true;
    }

    // Функция рисования фигуры
    function draw() {
        currentTetromino.rotations[currentRotation].forEach(block => {
            const x = currentPosition.x + block[0];
            const y = currentPosition.y + block[1];
            const index = y * gridWidth + x;
            if (blocks[index]) {
                blocks[index].classList.add('tetromino');
                blocks[index].style.backgroundColor = currentTetromino.color;
            }
        });
    }

    // Функция удаления фигуры
    function undraw() {
        currentTetromino.rotations[currentRotation].forEach(block => {
            const x = currentPosition.x + block[0];
            const y = currentPosition.y + block[1];
            const index = y * gridWidth + x;
            if (blocks[index]) {
                blocks[index].classList.remove('tetromino');
                blocks[index].style.backgroundColor = '';
            }
        });
    }

    // Проверка валидности движения
    function isValidMove(deltaX, deltaY, rotation) {
        return rotation.every(block => {
            const x = currentPosition.x + block[0] + deltaX;
            const y = currentPosition.y + block[1] + deltaY;
            const index = y * gridWidth + x;
            return (
                x >= 0 &&
                x < gridWidth &&
                y < gridHeight &&
                (y < 0 || !blocks[index].classList.contains('taken'))
            );
        });
    }
    // Интервал падения фигур
    function getInterval() {
        return Math.max(100, 1000 - (level - 1) * 50);
    }
    // Функция паузы

    function startPauseGame() {
        if (startPauseButton.innerText === 'Начать новую игру') {
            resetGame();
        } else if (isPaused) {
            timerId = setInterval(moveDown, getInterval());
            startPauseButton.innerText = 'Пауза';
            isPaused = false;
        } else {
            clearInterval(timerId);
            startPauseButton.innerText = 'Старт';
            isPaused = true;
        }
    }
    
      

    // Кнопка старт/пауза

    startPauseButton.addEventListener('click', startPauseGame);


    // Функция сброса игры
    function resetGame() {
        blocks.forEach(block => {
            block.classList.remove('tetromino', 'taken');
            block.style.backgroundColor = '';
        });
        score = 0;
        level = 1;
        linesCleared = 0;
        scoreDisplay.innerText = score;
        levelDisplay.innerText = level;
        isPaused = false;
        startPauseButton.innerText = 'Пауза';
        document.addEventListener('keydown', control);
        createNewTetromino();
        timerId = setInterval(moveDown, getInterval());
        holdTetromino = null;
        displayHoldTetromino();
        canHold = true;
    }

    // Запуск игры
    createNewTetromino();
    timerId = setInterval(moveDown, 1000);

    // Проверка и удаление заполненных линий
    function checkForCompletedLines() {
        let lines = 0;
        for (let y = 0; y < gridHeight; y++) {
            let isComplete = true;
            for (let x = 0; x < gridWidth; x++) {
                const index = y * gridWidth + x;
                if (!blocks[index].classList.contains('taken')) {
                    isComplete = false;
                    break;
                }
            }
            if (isComplete) {
                lines++;

                for (let x = 0; x < gridWidth; x++) {
                    const index = y * gridWidth + x;
                    blocks[index].classList.remove('taken', 'tetromino');
                    blocks[index].style.backgroundColor = '';
                }
    
                for (let i = y * gridWidth - 1; i >= 0; i--) {
                    if (blocks[i].classList.contains('taken')) {
                        blocks[i].classList.remove('taken', 'tetromino');
                        blocks[i + gridWidth].classList.add('taken');
                        blocks[i + gridWidth].style.backgroundColor = blocks[i].style.backgroundColor;
                        blocks[i].style.backgroundColor = '';
                    }
                }
    
                y--;
            }
        }
    
        if (lines > 0) {
            const points = [0, 10, 20, 40, 80];
            score += points[lines] * level;
            linesCleared += lines;
            scoreDisplay.innerText = score;
    
            if (linesCleared >= level * 10) {
                level += 1;
                levelDisplay.innerText = level;
                clearInterval(timerId);
                timerId = setInterval(moveDown, getInterval());
            }         
        }

        if (score > highScore) {
            highScore = score;
            localStorage.setItem('tetrisHighScore', highScore);
            highScoreDisplay.innerText = highScore;
        }
        
    }
    

    // Отображение следующей фигуры

    function displayNextTetromino() {
        miniGridBlocks.forEach(block =>  {
            block.classList.remove('tetromino')
            block.style.backgroundColor = '';
        });

        const rotation = nextTetromino.rotations[0];

        let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
        rotation.forEach(block =>{
            const x = block[0];
            const y = block[1];

            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
        });

        const tetrominoWidth = maxX - minX + 1;
        const tetrominoHeith = maxY - minY + 1;


        const offsetX = Math.floor((miniGridWidth - tetrominoWidth) / 2) - minX;
        const offsetY = Math.floor((miniGridWidth - tetrominoHeith) / 2) - minY;

        rotation.forEach(block => {
            const x = block[0] + offsetX;
            const y = block[1] + offsetY;
            const index = y * miniGridWidth + x;
            if (miniGridBlocks[index]) {
                miniGridBlocks[index].classList.add('tetromino');
                miniGridBlocks[index].style.backgroundColor = nextTetromino.color;
            }
        });
    }

    // Отображение удержанной фигуры

    function displayHoldTetromino() {
        holdGridBlocks.forEach(block => {
            block.classList.remove('tetromino');
            block.style.backgroundColor = '';
        });
    
        if (holdTetromino) {
            const rotation = holdTetromino.rotations[0];
    
            let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
            rotation.forEach(block => {
                const x = block[0];
                const y = block[1];
                if (x < minX) minX = x;
                if (x > maxX) maxX = x;
                if (y < minY) minY = y;
                if (y > maxY) maxY = y;
            });
    
            const tetrominoWidth = maxX - minX + 1;
            const tetrominoHeight = maxY - minY + 1;
    
            const offsetX = Math.floor((holdGridWidth - tetrominoWidth) / 2) - minX;
            const offsetY = Math.floor((holdGridHeight - tetrominoHeight) / 2) - minY;
    
            rotation.forEach(block => {
                const x = block[0] + offsetX;
                const y = block[1] + offsetY;
                const index = y * holdGridWidth + x;
                if (holdGridBlocks[index]) {
                    holdGridBlocks[index].classList.add('tetromino');
                    holdGridBlocks[index].style.backgroundColor = holdTetromino.color;
                }
            });
        }
    }
    
    holdButton.addEventListener('click', holdTetrominoFunction);

    function holdTetrominoFunction() {
        if (!canHold) return;
        undraw();
        if (holdTetromino) {
            [currentTetromino, holdTetromino] = [holdTetromino, currentTetromino];
            currentRotation = 0;
            currentPosition = { x: 4, y: 0 };
        } else {
            holdTetromino = currentTetromino;
            createNewTetromino();
        }
        displayHoldTetromino();
        canHold = false;
    }
    
});
