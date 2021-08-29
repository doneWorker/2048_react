export const BOARD_SIZE = 16;
export const TILE_SIZE = 180;
export const TILE_OFFSET = 15;
export const WIDTH = 4;
export const HEIGHT = 4;
export const UP = "UP";
export const RIGHT = "RIGHT";
export const DOWN = "DOWN";
export const LEFT = "LEFT";

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

  console.log("out", out);
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
