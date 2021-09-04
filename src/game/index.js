export const BOARD_SIZE = 16;
export const TILE_SIZE = 180;
export const TILE_OFFSET = 15;
export const WIDTH = 4;
export const HEIGHT = 4;
export const UP = "UP";
export const RIGHT = "RIGHT";
export const DOWN = "DOWN";
export const LEFT = "LEFT";
export const directions = {
  UP: "UP",
  RIGHT: "RIGHT",
  DOWN: "DOWN",
  LEFT: "LEFT",
};
export const TILE_VALUES = [2, 4];

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function copyArray(array) {
  return JSON.parse(JSON.stringify(array));
}

export function getTilePosition(
  row,
  col,
  boardSize = BOARD_SIZE,
  tileSize = TILE_SIZE,
  margin = TILE_OFFSET
) {
  let x = margin * (col + 1) + col * tileSize,
    y = margin * (row + 1) + row * tileSize;

  return {
    x,
    y,
  };
}

function transpose(a) {
  var w = a.length || 0;
  var h = a[0] instanceof Array ? a[0].length : 0;

  if (h === 0 || w === 0) {
    return [];
  }

  var i,
    j,
    t = [];

  for (i = 0; i < h; i++) {
    t[i] = [];

    for (j = 0; j < w; j++) {
      t[i][j] = a[j][i];
    }
  }

  return t;
}

export function generateBoard(width = WIDTH, height = HEIGHT) {
  return new Array(height).fill(new Array(width).fill(null));
}

export function merge(board, dir) {
  let score = 0;
  const needTranspose = () => [directions.UP, directions.DOWN].includes(dir);
  const needLeftPadding = () =>
    [directions.DOWN, directions.RIGHT].includes(dir);

  board = needTranspose() ? transpose(board) : board;
  let output = [],
    w = board[0].length;

  board.forEach((row) => {
    let newRow = [];
    let prevTile = null;

    row.forEach((tile) => {
      if (tile === null) return;

      if (tile === prevTile) {
        newRow[newRow.length - 1] = tile * 2;
        score += tile;
      } else {
        prevTile = tile;
        newRow.push(tile);
      }
    });

    let padding = new Array(w - newRow.length).fill(null);
    needLeftPadding()
      ? output.push([...padding, ...newRow])
      : output.push([...newRow, ...padding]);
  });

  output = needTranspose() ? transpose(output) : output;
  return [score, output];
}

export function getFreePlace(board) {
  let freeCells = [];
  board.forEach((row, rowId) => {
    row.forEach((col, colId) => {
      if (col === null) freeCells.push([rowId, colId]);
    });
  });

  let pos = freeCells[getRandomIntInclusive(0, freeCells.length - 1)];
  return pos;
}

export function getRandomTileValue() {
  return TILE_VALUES[getRandomIntInclusive(0, TILE_VALUES.length - 1)];
}

export function addNewTile(board) {
  let updated = copyArray(board);
  let [row, col] = getFreePlace(updated);
  updated[row][col] = getRandomTileValue();

  return updated;
}
