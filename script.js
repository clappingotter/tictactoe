// ... (keep the previous code as is)

// Add this line at the beginning of the script.js file
const startGameButton = document.getElementById('start-game');

// Add this line after the cells.forEach line
startGameButton.addEventListener('click', startGame);

// ... (keep the previous code as is)

function startGame() {
    // Randomly decide who goes first (true for X, false for O)
    isXTurn = Math.random() < 0.5;

    // Clear the board and enable cell click listeners
    cells.forEach(cell => {
        cell.textContent = '';
        cell.dataset.mark = '';
        cell.addEventListener('click', handleClick, { once: true });
    });

    // Show an alert indicating which player goes first
    if (isXTurn) {
        alert('X goes first!');
    } else {
        alert('O goes first!');
        makeAIMove();
    }
}


// ... (keep the previous code as is)


const cells = document.querySelectorAll('[data-cell]');
const X_CLASS = 'x';
const O_CLASS = 'o';
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let isXTurn = true;

cells.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true });
});

function handleClick(e) {
    const cell = e.target;
    const currentClass = isXTurn ? X_CLASS : O_CLASS;

    placeMark(cell, currentClass);

    if (checkWin(currentClass)) {
        alert(`${currentClass} wins!`);
    } else if (isDraw()) {
        alert('Draw!');
    } else {
        switchTurns();
    }
}

function placeMark(cell, currentClass) {
    cell.dataset.mark = currentClass;
    cell.textContent = currentClass.toUpperCase();
}

function switchTurns() {
    isXTurn = !isXTurn;
}

function checkWin(currentClass) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].dataset.mark === currentClass;
        });
    });
}

function isDraw() {
    return Array.from(cells).every(cell => {
        return cell.dataset.mark === X_CLASS || cell.dataset.mark === O_CLASS;
    });
}
// ... (keep the previous code as is)

function handleClick(e) {
    const cell = e.target;
    const currentClass = isXTurn ? X_CLASS : O_CLASS;

    placeMark(cell, currentClass);

    setTimeout(() => { // Add this line
        if (checkWin(currentClass)) {
            alert(`${currentClass} wins!`);
        } else if (isDraw()) {
            alert('Draw!');
        } else {
            switchTurns();
            if (!isXTurn) {
                setTimeout(makeAIMove, 500); // 500ms delay before the AI move
            }
        }
    }, 100); // Add a 100ms delay before checking for a win or draw
}


// ... (keep the previous code as is)

function makeAIMove() {
    const emptyCells = Array.from(cells).filter(cell => {
        return !cell.dataset.mark;
    });

    if (emptyCells.length === 0) return;

    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const aiCell = emptyCells[randomIndex];

     placeMark(aiCell, O_CLASS);

    if (checkWin(O_CLASS)) {
        setTimeout(() => {
            alert(`${O_CLASS} wins!`);
        }, 100);
    } else if (isDraw()) {
        setTimeout(() => {
            alert('Draw!');
        }, 100);
    }

    switchTurns();
}

  
