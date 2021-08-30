export const BOARD_SIZE = 16;
export const TILE_SIZE = 180;
export const TILE_OFFSET = 15;
export const WIDTH = 4;
export const HEIGHT = 4;
export const UP = "UP";
export const RIGHT = "RIGHT";
export const DOWN = "DOWN";
export const LEFT = "LEFT";
export const TILE_VALUES = [2, 4];

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getCols(board) {
  let cols = new Array(HEIGHT).fill(0).map(() => []);

  board.forEach((item, idx) => {
    cols[idx % WIDTH].push(item);
  });

  return cols;
}

export function getRows(board) {
  let rows = [];
  let currentRow = [];
  board.forEach((item, idx) => {
    currentRow.push(item);
    if ((idx + 1) % WIDTH === 0) {
      rows.push(currentRow);
      currentRow = [];
    }
  });

  return rows;
}

export function flatVertical(cols) {
  let out = new Array(WIDTH * HEIGHT);

  cols.forEach((col, colIdx) => {
    col.forEach((item, itemIdx) => {
      out[colIdx + itemIdx * HEIGHT] = item;
    });
  });

  return out;
}

// TODO: optimize merge
export function merge(state, dir = "LEFT") {
  const rows = getRows(state);
  const cols = getCols(state);

  return dir === "LEFT" || dir === "RIGHT"
    ? rows
        .map((row) => {
          let updatedRow = [];
          let lastNum = 0;
          row.forEach((item) => {
            if (item === 0) {
              return;
            } else if (item === lastNum) {
              updatedRow[updatedRow.length - 1] = item * 2;
              lastNum = 0;
            } else {
              updatedRow.push(item);
              lastNum = item;
            }
          });

          let padding = new Array(WIDTH - updatedRow.length).fill(0);
          let outputRows =
            updatedRow.length === WIDTH
              ? updatedRow
              : dir === "LEFT"
              ? [...updatedRow, ...padding]
              : dir === "RIGHT"
              ? [...padding, ...updatedRow]
              : null;

          return outputRows;
        })
        .flat()
    : flatVertical(
        cols.map((col) => {
          let updatedCol = [];
          let lastNum = 0;
          col.forEach((item) => {
            if (item === 0) {
              return;
            } else if (item === lastNum) {
              updatedCol[updatedCol.length - 1] = item * 2;
              lastNum = 0;
            } else {
              updatedCol.push(item);
              lastNum = item;
            }
          });

          let padding = new Array(HEIGHT - updatedCol.length).fill(0);
          let outputCols =
            updatedCol.length === HEIGHT
              ? updatedCol
              : dir === "UP"
              ? [...updatedCol, ...padding]
              : dir === "DOWN"
              ? [...padding, ...updatedCol]
              : null;

          return outputCols;
        })
      );
}

export function generateBoard(width = WIDTH, height = HEIGHT) {
  let out = [];
  for (let i = 0; i < height; i++) {
    for (let n = 0; n < width; n++) {
      out.push(null);
    }
  }

  return out;
}

export function getFreePlace(board) {
  let freeCells = board.map((row, idx) => row === null && idx);
  return freeCells[getRandomIntInclusive(0, freeCells.length)];
}

function getRandomTileValue() {
  return TILE_VALUES[getRandomIntInclusive(0, TILE_VALUES.length - 1)];
}

export function addNewTile(board) {
  let index = getFreePlace(board);
  let updated = [...board];
  updated[index] = {
    populated: true,
    value: getRandomTileValue(),
  };

  return updated;
}

export function mergeTiles(board, dir = LEFT) {
  return dir === LEFT || dir === RIGHT
    ? mergeHorizontal(board, dir)
    : mergeVertical(board, dir);
}

export function mergeVertical(board, dir) {
  let newBoard = [];
  let cols = getCols(board);

  return flatVertical(
    cols.map((col, colIdx) => {
      let updatedCol = [];
      let lastNum;

      col.forEach((tile, tileIdx) => {
        if (tile === null) {
          return;
        } else if (tile.value === lastNum) {
          updatedCol[updatedCol.length - 1].value = tile.value * 2;
          updatedCol[updatedCol.length - 1].from = colIdx + tileIdx * HEIGHT;
          lastNum = 0;
        } else {
          updatedCol.push(tile);
          lastNum = tile.value;
        }
      });

      let padding = new Array(HEIGHT - updatedCol.length).fill(null);
      let outputCols =
        updatedCol.length === HEIGHT
          ? updatedCol
          : dir === "UP"
          ? [...updatedCol, ...padding]
          : dir === "DOWN"
          ? [...padding, ...updatedCol]
          : null;

      return outputCols;
    })
  );
}

export function mergeHorizontal(board, dir) {
  let newBoard = [];
  let row = [];

  // move & merge
  board.forEach((tile, idx) => {
    if (tile !== null) {
      // same tiles in row
      if (row.length > 0 && tile.value === row[row.length - 1].value) {
        row[row.length - 1] = {
          ...tile,
          ...{ from: idx, value: tile.value * 2 },
        };
      } else {
        row.push({ ...tile, ...{ from: idx } });
      }
    }

    // last element in row
    if ((idx + 1) % WIDTH === 0) {
      let padding = new Array(WIDTH - row.length).fill(null);
      row = dir === LEFT ? [...row, ...padding] : [...padding, ...row];
      newBoard.push(row);
      row = [];
    }
  });

  return newBoard.flat();
}
