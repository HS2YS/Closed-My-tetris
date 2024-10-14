document.addEventListener('DOMContentLoaded', () => {
    const gameGrid = document.querySelector('.game-grid');
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
            color: 'white'
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

    function getRandomTetromino() {
        const randomIndex = Math.floor(Math.random() * tetrominoes.length);
        return tetrominoes[randomIndex];
    }

    let tetromino = getRandomTetromino();
    currentTetromino = tetromino.shape[currentRotation];
    let currentColor = tetromino.color;

    let iShape = [currentPosition, currentPosition + 10, currentPosition + 20, currentPosition + 30];

    for (let i = 0; i < 200; i++) {
        const block = document.createElement('div');
        gameGrid.appendChild(block);
    }

    const blocks = Array.from(document.querySelectorAll('.game-grid div'));

    function draw() {
        currentTetromino.forEach(index => {
            blocks[currentPosition + index].classList.add('tetromino');
            blocks[currentPosition + index].style.backgroundColor = currentColor;
        });
    };
    function undraw() {
        currentTetromino.forEach(index => {
            blocks[currentPosition + index].classList.remove('tetromino');
            blocks[currentPosition + index].style.backgroundColor = '';
        });
    };
    draw();


    let timerId = setInterval(moveDown, 250);

    function moveDown() {
        undraw();
        if (!currentTetromino.some(index => blocks[currentPosition + index +10].classList.contains('taken') || (currentPosition + index + 10) >= 200)) {
            currentPosition += 10;
        } else {
            currentTetromino.forEach(index => {
                blocks[currentPosition + index].classList.add('taken');
                blocks[currentPosition + index].style.backgroundColor = currentColor;
            });

            startNewTetromino();
        }
        draw();
    };

    function startNewTetromino() {
        currentRosition = 0;
        currentPosition = 4;
        tetromino = getRandomTetromino();
        currentTetromino = tetromino.shape[currentRotation];
        currentColor = tetromino.color;
    };
});
