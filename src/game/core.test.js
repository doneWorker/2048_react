import { merge, generateBoard, getFreePlace, directions } from "./index";

test("generating board (proper cols and rows)", () => {
  let width = 3,
    height = 10;
  let board = generateBoard(3, 10);

  expect(board.length).toBe(height);
  expect(board[height - 1][width - 1]).toBeNull();
});

test("merge left working properly", () => {
  const input = [
    [2, 2, 4, 4],
    [2, 2, null, null],
    [null, null, 4, 4],
  ];

  const expected = [
    [4, 8, null, null],
    [4, null, null, null],
    [8, null, null, null],
  ];

  expect(merge(input, directions.LEFT)).toEqual(expected);
});

test("merge right working properly", () => {
  const input = [
    [2, 2, 4, 4],
    [2, 2, null, null],
    [null, null, 4, 4],
  ];

  const expected = [
    [null, null, 4, 8],
    [null, null, null, 4],
    [null, null, null, 8],
  ];

  expect(merge(input, directions.RIGHT)).toEqual(expected);
});

test("merge up working properly", () => {
  const input = [
    [2, 2, 4, 4],
    [2, 2, null, null],
    [null, null, 4, 4],
  ];

  const expected = [
    [4, 4, 8, 8],
    [null, null, null, null],
    [null, null, null, null],
  ];

  expect(merge(input, directions.UP)).toEqual(expected);
});

test("merge down working properly", () => {
  const input = [
    [2, 2, 4, 4],
    [2, 2, null, null],
    [null, null, 4, 4],
  ];

  const expected = [
    [null, null, null, null],
    [null, null, null, null],
    [4, 4, 8, 8],
  ];

  expect(merge(input, directions.DOWN)).toEqual(expected);
});

test("getFreePlace working properly", () => {
  const input = [
    [4, 4, 4],
    [4, 4, 4],
    [4, 4, null],
  ];
  const out = getFreePlace(input);
  const expected = [2, 2];

  expect(out).toEqual(expected);
});

// test("getCols working properly", () => {
//   let out = getCols(input);

//   expect(out).toEqual(outputCols);
// });

// test("flatVertical working properly", () => {
//   let cols = getCols(input);
//   let out = flatVertical(cols);

//   expect(out).toEqual(input);
// });

// test("generateBoard working properly", () => {
//   let board = generateBoard(3, 3);
//   expect(board).toEqual([null, null, null, null, null, null, null, null, null]);
// });

// test("mergeVertical working properly", () => {
//   let board = generateBoard(3, 3);
//   board[4] = { value: 4 };
//   board[7] = { value: 4 };

//   expect(board[0]).toEqual(4);
// });
