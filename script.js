document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const scoreDisplay = document.getElementById('score');
    const width = 10;
    let score = 0;

    // Create the grid
    for (let i = 0; i < 200; i++) {
        const cell = document.createElement('div');
        grid.appendChild(cell);
    }

    // Add the bottom row for collision detection
    for (let i = 0; i < 10; i++) {
        const cell = document.createElement('div');
        cell.classList.add('taken');
        grid.appendChild(cell);
    }

    const cells = Array.from(grid.querySelectorAll('div'));

    // Tetromino shapes
    const lTetromino = [
        [1, width + 1, width * 2 + 1, 2],
        [width, width + 1, width + 2, width * 2 + 2],
        [1, width + 1, width * 2 + 1, width * 2],
        [width, width * 2, width * 2 + 1, width * 2 + 2],
    ];

    const zTetromino = [
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1],
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1],
    ];

    const tTetromino = [
        [1, width, width + 1, width + 2],
        [1, width + 1, width + 2, width * 2 + 1],
        [width, width + 1, width + 2, width * 2 + 1],
        [1, width, width + 1, width * 2 + 1],
    ];

    const oTetromino = [
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
    ];

    const iTetromino = [
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3],
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3],
    ];

    const tetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];

    let currentPosition = 4;
    let currentRotation = 0;

    // Select a random Tetromino
    let random = Math.floor(Math.random() * tetrominoes.length);
    let current = tetrominoes[random][currentRotation];

    // Draw the Tetromino
    function draw() {
        current.forEach((index) => {
            cells[currentPosition + index].classList.add('tetromino');
            cells[currentPosition + index].style.backgroundColor = 'blue';
        });
    }

    // Undraw the Tetromino
    function undraw() {
        current.forEach((index) => {
            cells[currentPosition + index].classList.remove('tetromino');
            cells[currentPosition + index].style.backgroundColor = '';
        });
    }

    // Move Tetromino down
    function moveDown() {
        undraw();
        currentPosition += width;
        draw();
        freeze();
    }

    // Freeze the Tetromino when it hits the bottom or another block
    function freeze() {
        if (
            current.some((index) =>
                cells[currentPosition + index + width].classList.contains('taken')
            )
        ) {
            current.forEach((index) => cells[currentPosition + index].classList.add('taken'));
            // Start a new Tetromino
            random = Math.floor(Math.random() * tetrominoes.length);
            current = tetrominoes[random][currentRotation];
            currentPosition = 4;
            draw();
            addScore();
        }
    }

    // Add score
    function addScore() {
        for (let i = 0; i < 199; i += width) {
            const row = Array.from({ length: width }, (_, j) => i + j);
            if (row.every((index) => cells[index].classList.contains('taken'))) {
                score += 10;
                scoreDisplay.textContent = score;
                row.forEach((index) => {
                    cells[index].classList.remove('taken', 'tetromino');
                    cells[index].style.backgroundColor = '';
                });
                const removed = cells.splice(i, width);
                cells.unshift(...removed);
                cells.forEach((cell) => grid.appendChild(cell));
            }
        }
    }

    // Controls
    function control(e) {
        if (e.keyCode === 37) moveLeft();
        if (e.keyCode === 39) moveRight();
        if (e.keyCode === 40) moveDown();
    }
    document.addEventListener('keydown', control);

    // Move Tetromino left
    function moveLeft() {
        undraw();
        const isAtLeftEdge = current.some((index) => (currentPosition + index) % width === 0);
        if (!isAtLeftEdge) currentPosition -= 1;
        if (current.some((index) => cells[currentPosition + index].classList.contains('taken'))) {
            currentPosition += 1;
        }
        draw();
    }

    // Move Tetromino right
    function moveRight() {
        undraw();
        const isAtRightEdge = current.some((index) => (currentPosition + index) % width === width - 1);
        if (!isAtRightEdge) currentPosition += 1;
        if (current.some((index) => cells[currentPosition + index].classList.contains('taken'))) {
            currentPosition -= 1;
        }
        draw();
    }

    // Start the game
    draw();
    setInterval(moveDown, 1000);
});
