export const BOARD_SIZE = 16;
export const TILE_SIZE = 180;
export const TILE_OFFSET = 15;
export const WIDTH = 4;
export const HEIGHT = 4;
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

// only for copying 2d
function copyArray(array) {
  let newArray = [];
  for (let i = 0; i < array.length; i++) {
    let newSubArray = [];
    for (let j = 0; j < array[i].length; j++) {
      newSubArray.push(array[i][j]);
    }

    newArray.push(newSubArray);
  }

  return newArray;
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

export function updatePrevPosition(board) {
  return board.map((row, rowIdx) => {
    return row.map((tile, colIdx) => {
      if (tile?.prevPos) {
        tile.prevPos = [rowIdx, colIdx];
      }

      return tile;
    });
  });
}

export function canMove(board, dir) {
  board = copyArray(board);
  let isLeftDirection = [directions.LEFT, directions.UP].includes(dir);
  let needTranspose = [directions.DOWN, directions.UP].includes(dir);

  if (needTranspose) {
    board = transpose(board);
  }

  const totalRows = board.length;
  const totalCols = board[0].length;

  for (let rIdx = 0; rIdx < totalRows; rIdx++) {
    let currentRow = !isLeftDirection ? board[rIdx].reverse() : board[rIdx];
    let prevNumber = null;
    let prevTile;
    let isFirstEmpty = currentRow[0] === null;

    for (let cIdx = 0; cIdx < totalCols; cIdx++) {
      let tile = currentRow[cIdx];
      if (tile !== null) {
        if (isFirstEmpty && cIdx > 0) return true;
        if (prevNumber === tile.value) return true;
        if (prevTile === null) return true;
        prevNumber = tile.value;
      }

      prevTile = tile;
    }
  }

  return false;
}

// move'n merge
export function merge(board, dir) {
  board = updatePrevPosition(copyArray(board));

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

      tile.populated = false;

      if (prevTile && tile.value === prevTile.value) {
        newRow[newRow.length - 1] = {
          ...tile,
          value: tile.value * 2,
          prevPos: needLeftPadding() ? prevTile.prevPos : tile.prevPos,
        };
        score += tile.value;
        prevTile = null;
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
  updated[row][col] = {
    value: getRandomTileValue(),
    prevPos: [row, col],
    populated: true,
  };

  return updated;
}
