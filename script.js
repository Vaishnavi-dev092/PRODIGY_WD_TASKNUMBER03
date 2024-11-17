const board = document.getElementById('board');
const cells = Array.from(document.querySelectorAll('.cell'));
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restartBtn');

let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', '']; // Empty cells
let isGameActive = true;

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

// Handle Cell Click
const handleCellClick = (index) => {
  if (gameState[index] !== '' || !isGameActive) return;

  // Mark the cell
  gameState[index] = currentPlayer;
  cells[index].textContent = currentPlayer;

  // Check for a winner
  if (checkWinner()) {
    statusText.textContent = `${currentPlayer} Wins!`;
    isGameActive = false;
  } else if (gameState.every(cell => cell !== '')) {
    // Check for a draw
    statusText.textContent = "It's a Draw!";
    isGameActive = false;
  } else {
    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `${currentPlayer}'s Turn`;
  }
};

// Check Winner
const checkWinner = () => {
  return winningCombinations.some(combination => {
    const [a, b, c] = combination;
    return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
  });
};

// Handle Restart Game
const restartGame = () => {
  gameState = ['', '', '', '', '', '', '', '', ''];
  isGameActive = true;
  currentPlayer = 'X';
  statusText.textContent = `${currentPlayer}'s Turn`;
  cells.forEach(cell => cell.textContent = '');
};

// Add event listeners to each cell
cells.forEach((cell, index) => {
  cell.addEventListener('click', () => handleCellClick(index));
});

restartBtn.addEventListener('click', restartGame);
