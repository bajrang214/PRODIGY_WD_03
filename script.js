const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const message = document.getElementById('message');
const restartBtn = document.getElementById('restartBtn');

let currentPlayer = 'X';
let gameActive = true;

const WINNING_COMBINATIONS = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // cols
  [0,4,8], [2,4,6]           // diagonals
];

function handleClick(e) {
  const cell = e.target;

  if (!gameActive || cell.textContent !== '') return;

  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer.toLowerCase());

  if (checkWin(currentPlayer)) {
    message.textContent = `🎉 Player ${currentPlayer} wins!`;
    gameActive = false;
  } else if (isDraw()) {
    message.textContent = "It's a draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    message.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWin(player) {
  return WINNING_COMBINATIONS.some(comb => {
    return comb.every(index => {
      return cells[index].textContent === player;
    });
  });
}

function isDraw() {
  return [...cells].every(cell => cell.textContent !== '');
}

function restartGame() {
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('x', 'o');
  });
  currentPlayer = 'X';
  gameActive = true;
  message.textContent = "Player X's turn";
}

cells.forEach(cell => {
  cell.addEventListener('click', handleClick);
});

restartBtn.addEventListener('click', restartGame);

// Init
message.textContent = "Player X's turn";
