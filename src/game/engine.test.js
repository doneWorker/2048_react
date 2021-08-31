import { flatVertical, getCols, generateBoard } from "./index";

const input = [0, 0, 5, 0, 0, 0, 5, 0, 0, 0, 5, 0, 0, 0, 5, 0];

const outputCols = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [5, 5, 5, 5],
  [0, 0, 0, 0],
];

test("getCols working properly", () => {
  let out = getCols(input);

  expect(out).toEqual(outputCols);
});

test("flatVertical working properly", () => {
  let cols = getCols(input);
  let out = flatVertical(cols);

  expect(out).toEqual(input);
});

test("generateBoard working properly", () => {
  let board = generateBoard(3, 3);
  expect(board).toEqual([null, null, null, null, null, null, null, null, null]);
});

test("mergeVertical working properly", () => {
  let board = generateBoard(3, 3);
  board[4] = { value: 4 };
  board[7] = { value: 4 };

  expect(board[0]).toEqual(4);
});
