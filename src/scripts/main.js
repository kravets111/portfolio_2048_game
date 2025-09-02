/* eslint-disable max-len */
/* eslint-disable no-undef */
'use strict';

const Game = require('../modules/Game.class');
const game = new Game();
const messageStart = document.querySelector('.message-start');
const messageWin = document.querySelector('.message-win');
const messageLose = document.querySelector('.message-lose');
const buttonStart = document.querySelector('.button.start');

let shouldAnimateNewTile = false;

const SCALE = 75;
const GAP = 10;
const PADDING = 10;

const getTilePosition = (row, col) => {
  const left = col * (SCALE + GAP) + PADDING;
  const top = row * (SCALE + GAP) + PADDING;

  return {
    top,
    left,
  };
};

document.addEventListener('keydown', (event) => {
  if (game.getStatus() !== 'playing') {
    return;
  }

  let moved = false;
  let oldTiles;

  switch (event.key) {
    case 'ArrowLeft':
      oldTiles = captureCurrentTiles();
      moved = game.moveLeft();

      break;

    case 'ArrowRight':
      oldTiles = captureCurrentTiles();
      moved = game.moveRight();

      break;

    case 'ArrowUp':
      oldTiles = captureCurrentTiles();
      moved = game.moveUp();

      break;

    case 'ArrowDown':
      oldTiles = captureCurrentTiles();
      moved = game.moveDown();

      break;

    default:
      return;
  }

  if (moved) {
    animateMove(oldTiles, () => {
      shouldAnimateNewTile = true;
      game.addRandomTile();
      game.updateStatus();
      renderBoard();
      shouldAnimateNewTile = false;
    });
  }
});

const captureCurrentTiles = () => {
  const tiles = [];
  const boardGame = game.getState();

  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      const value = boardGame[row][col];

      if (value !== 0) {
        const position = getTilePosition(row, col);

        tiles.push({
          value: value,
          oldRow: row,
          oldCol: col,
          oldTop: position.top,
          oldLeft: position.left,
        });
      }
    }
  }

  return tiles;
};

const animateMove = (oldTiles, callback) => {
  const boardGame = game.getState();
  const tilesContainer = document.querySelector('.game-tiles');

  tilesContainer.innerHTML = '';

  oldTiles.forEach(oldTile => {
    const tile = document.createElement('div');

    tile.style.top = oldTile.oldTop + 'px';
    tile.style.left = oldTile.oldLeft + 'px';
    tile.textContent = oldTile.value;
    tile.classList.add('tile');
    tile.classList.add(`tile--${oldTile.value}`);

    tilesContainer.appendChild(tile);

    let newRow = -1;
    let newCol = -1;

    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        if (boardGame[row][col] === oldTile.value) {
          const oldPositionCurrent = Math.abs(row - oldTile.oldRow) + Math.abs(col - oldTile.oldCol);
          const newPositionCurrent = Math.abs(newRow - oldTile.oldRow) + Math.abs(newCol - oldTile.oldCol);

          if (newRow === -1 || oldPositionCurrent < newPositionCurrent) {
            newRow = row;
            newCol = col;
          }
        }
      }
    }

    if (newRow !== -1) {
      const newPosition = getTilePosition(newRow, newCol);

      tile.style.transition = 'all 0.1s ease-out';
      tile.style.top = newPosition.top + 'px';
      tile.style.left = newPosition.left + 'px';
    }
  });

  setTimeout(() => {
    callback();
  }, 100);
};

buttonStart.addEventListener('click', () => {
  const statusButton = game.getStatus();

  if (statusButton === 'idle') {
    game.start();
  } else {
    game.restart();
  }

  buttonStart.classList.remove('start');
  buttonStart.classList.add('restart');
  buttonStart.textContent = 'Restart';

  renderBoard();
});

const renderBoard = () => {
  const boardGame = game.getState();
  const tilesContainer = document.querySelector('.game-tiles');

  tilesContainer.innerHTML = '';

  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      const value = boardGame[row][col];

      if (value !== 0) {
        const position = getTilePosition(row, col);
        const tile = document.createElement('div');

        tile.style.top = position.top + 'px';
        tile.style.left = position.left + 'px';
        tile.textContent = value;

        tile.classList.add('tile');

        if (shouldAnimateNewTile) {
          tile.classList.add('tile--new');
        }
        tile.classList.add(`tile--${value}`);
        tilesContainer.appendChild(tile);
      }
    }
  }

  updateScoreDisplay();

  const statusGame = game.getStatus();

  messageStart.classList.add('hidden');
  messageWin.classList.add('hidden');
  messageLose.classList.add('hidden');

  if (statusGame === 'win') {
    messageWin.classList.remove('hidden');
  } else if (statusGame === 'lose') {
    messageLose.classList.remove('hidden');
  }
};

const getBestScore = () => {
  return parseInt(localStorage.getItem('2048-best-score') || '0');
};

const saveBestScore = (score) => {
  const currentBest = getBestScore();

  if (score > currentBest) {
    localStorage.setItem('2048-best-score', score.toString());

    return true;
  }

  return false;
};

const updateScoreDisplay = () => {
  const currentScore = game.getScore();
  const bestScore = getBestScore();

  document.querySelector('.game-score').textContent = currentScore;
  document.querySelector('.best-score').textContent = bestScore;

  saveBestScore(currentScore);
};

document.querySelector('.best-score').textContent = getBestScore();
