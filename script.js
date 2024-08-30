const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const resetButton = document.getElementById('reset');
let board = Array(9).fill(null);
let currentPlayer = 'X';

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

function checkWinner() {
    for (const [a, b, c] of winningCombinations) {
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return board.every(cell => cell !== null) ? 'Draw' : null;
}

function handleClick(event) {
    const cell = event.target;
    const index = cell.id;

    if (board[index] || checkWinner()) return;

    board[index] = currentPlayer;
    cell.classList.add(currentPlayer);
    cell.textContent = currentPlayer;

    const winner = checkWinner();
    if (winner) {
        status.textContent = winner === 'Draw' ? "It's a Draw!" : `${winner} Wins!`;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    if (currentPlayer === 'O') {
        setTimeout(aiMove, 500);
    }
}

function aiMove() {
    const availableMoves = board.map((cell, index) => cell === null ? index : null).filter(index => index !== null);
    const move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    if (move !== undefined) {
        board[move] = 'O';
        cells[move].classList.add('O');
        cells[move].textContent = 'O';
        const winner = checkWinner();
        if (winner) {
            status.textContent = winner === 'Draw' ? "It's a Draw!" : `${winner} Wins!`;
            return;
        }
        currentPlayer = 'X';
    }
}

function resetGame() {
    board = Array(9).fill(null);
    currentPlayer = 'X';
    cells.forEach(cell => {
        cell.classList.remove('X', 'O');
        cell.textContent = '';
    });
    status.textContent = '';
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
