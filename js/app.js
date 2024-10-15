document.addEventListener('DOMContentLoaded', () => {
    // Создание поля игры
    const gameGrid = document.querySelector('.game-grid');
    // Старт/пауза
    const startPauseButton = document.getElementById('start-pause-button')
    // Фигуры:
    const tetrominoes = [
        // iShape
        {
            shape: [[1,11,21,31], [10,11,12,13]],
            color: 'red'
        },
        // oShape
        {
            shape: [[0,1,10,11]],
            color: 'yellow'
        },
        // tShape
        {
            shape: [[1,10,11,12],[1,11,12,21],[10,11,12,21],[1,10,11,21]],
            color: 'pink'
        },
        // sShape
        {
            shape: [[1,2,10,11],[1,11,12,22]],
            color: 'blue'
        },
        // zShape
        {
            shape: [[0,1,11,12],[2,11,12,21]],
            color: 'cyan'
        },
        // jShape
        {
            shape: [[0,10,11,12],[1,2,11,21],[10,11,12,22],[1,11,20,21]],
            color: 'green'
        },
        // lShape
        {
            shape: [[2,10,11,12],[1,11,21,22],[10,11,12,20],[0,1,11,21]],
            color: 'orange'
        }
    ];

    let currentTetromino;
    let currentRotation = 0;
    let currentPosition = 4;
    let score = 0;
    let isPaused = false;

    document.addEventListener('keydown', control);
    
    function control(e) {
        if (e.keyCode === 37) {
            moveLeft();
        } else if (e.keyCode === 38) {
            rotate();
        } else if (e.keyCode === 39) {
            moveRight();
        } else if (e.keyCode === 40) {
            moveDown();
        }
    };


    function moveLeft() {
        undraw();
        const isAtLeftEdge = currentTetromino.some(index => (currentPosition + index) % 10 === 0);
        if (!isAtLeftEdge) currentPosition -=1;
        if (currentTetromino.some(index => blocks[currentPosition + index].classList.contains('taken'))) {
            currentPosition +=1;
        }
        draw();
    };
    function moveRight() {
        undraw();
        const isAtRightEdge = currentTetromino.some(index => (currentPosition + index) % 10 === 9);
        if (!isAtRightEdge) currentPosition +=1;
        if (currentTetromino.some(index => blocks[currentPosition + index].classList.contains('taken'))) {
            currentPosition -= 1;
        }
        draw()
    };
    function rotate() {
        undraw();
        currentRotation++;
        if (currentRotation === tetromino.shape.length) {
            currentRotation = 0;
        }
        currentTetromino = tetromino.shape[currentRotation];
        adjustPositionAfterRotation();
        draw();
    }
    function adjustPositionAfterRotation() {
        const rightEdge = currentTetromino.some(index => (currentPosition + index) % 10 > 9);
        const leftEdge = currentTetromino.some(index => (currentPosition + index) % 10 < 0);

        if (rightEdge) {
            currentPosition -= 1;
            adjustPositionAfterRotation();
        } else if (leftEdge) {
            currentPosition += 1;
            adjustPositionAfterRotation();
        }
    };

    function getRandomTetromino() {
        const randomIndex = Math.floor(Math.random() * tetrominoes.length);
        return tetrominoes[randomIndex];
    };

    let tetromino = getRandomTetromino();
    currentTetromino = tetromino.shape[currentRotation];
    let currentColor = tetromino.color;

    for (let i = 0; i < 200; i++) {
        const block = document.createElement('div');
        gameGrid.appendChild(block);
    };

    const blocks = Array.from(document.querySelectorAll('.game-grid div'));

    function draw() {
        currentTetromino.forEach(index => {
            blocks[currentPosition + index].classList.add('tetromino');
            blocks[currentPosition + index].style.backgroundColor = currentColor;
        });
    };
    function undraw() {
        currentTetromino.forEach(index => {
            const block = blocks[currentPosition + index];
            if (!block.classList.contains('taken')) {
                block.classList.remove('tetromino');
                block.style.backgroundColor = '';
            }
            // blocks[currentPosition + index].classList.remove('tetromino');
            // blocks[currentPosition + index].style.backgroundColor = '';
        });
    };
    draw();


    let timerId = setInterval(moveDown, 250);

    function moveDown() {
        undraw();
        if (!currentTetromino.some(index => (currentPosition + index + 10) >= 200 || blocks[currentPosition + index + 10].classList.contains('taken'))) {
            currentPosition += 10;
            draw();
        } else {
            currentTetromino.forEach(index => {
                blocks[currentPosition + index].classList.add('taken');
                blocks[currentPosition + index].style.backgroundColor = currentColor;
            });
            checkForCompletedLine();
            startNewTetromino();
        }
    };

    function startNewTetromino() {
        currentRotation = 0;
        currentPosition = 4;
        tetromino = getRandomTetromino();
        currentTetromino = tetromino.shape[currentRotation];
        currentColor = tetromino.color;
        if (currentTetromino.some(index => blocks[currentPosition + index].classList.contains('taken'))) {
            alert('Игра окончена : )');
            clearInterval(timerId);
            document.removeEventListener('keydown', control);
        } else {
            draw();
        }
    }
    

    function checkForCompletedLine() {
        for (let i = 0; i <199; i += 10) {
            const row = [];
            for (let j=0;j<10;j++) {
                row.push(i + j);
            }

            if (row.every(index => blocks[index].classList.contains('taken'))) {
                score += 10;
                document.getElementById('score').innerText = score;

                row.forEach(index => {
                    blocks[index].classList.remove('taken');
                    blocks[index].classList.remove('tetromino');
                    block[index].style.backgroundColor = '';
                });
                const removedBlocks = blocks.splice(i,10);
                blocks = removedBlocks.concat(blocks);
                blocks.forEach(cell => gameGrid.appendChild(cell));
            }
        }
    };

       startPauseButton.addEventListener('click', () => {
        if (isPaused) {
            timerId = setInterval(moveDown, 500);
            document.addEventListener('keydown', control);
            startPauseButton.innerText = 'Пауза';
            isPaused = false;
        } else {
            clearInterval(timerId);
            document.removeEventListener('keydown', control);
            startPauseButton.innerText = 'Старт';
            isPaused = true;
        }
    });
      


});
