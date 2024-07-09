let currentPlayer = 'X'; // 'X' or 'O'
let gameBoard = ['', '', '', '', '', '', '', '', '']; // Represents the game board, empty at start
let gameActive = true; // Flag to track if the game is still active

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns 
    [0, 4, 8], [2, 4, 6] // Diagonals
];

// Function to handle a cell click
function cellClicked(index) {
    if (gameActive && gameBoard[index] === '') {
        gameBoard[index] = currentPlayer; // Update the game board
        document.getElementById('gameBoard').children[index].textContent = currentPlayer; // Update UI

        if (checkWin()) {
            endGame(false); // Game won
        } else if (checkDraw()) {
            endGame(true); // Game drawn
        } else {
            // Switch turn to the other player
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            document.getElementById('status').textContent = `Player ${currentPlayer}'s turn`;
        }
    }
}

// Function to check for a win
function checkWin() {
    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return true; // Found a winning pattern
        }
    }
    return false;
}

// Function to check for a draw
function checkDraw() {
    return !gameBoard.includes(''); // If no empty cells, it's a draw
}

// Function to end the game
function endGame(draw) {
    gameActive = false;
    if (draw) {
        document.getElementById('status').textContent = "It's a draw!";
    } else {
        document.getElementById('status').textContent = `Player ${currentPlayer} wins!`;
    }
}

// Function to reset the game
function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;

    // Reset UI
    document.getElementById('gameBoard').querySelectorAll('.cell').forEach(cell => {
        cell.textContent = '';
    });
    document.getElementById('status').textContent = `Player ${currentPlayer}'s turn`;
}
