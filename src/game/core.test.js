import { merge, generateBoard, getFreePlace, directions } from "./index";

function leftOnlyValues(board) {
  return board.map((row) => {
    return row.map((col) => {
      return col !== null ? { value: col.value } : null;
    });
  });
}

test("generating board (proper cols and rows)", () => {
  let width = 3,
    height = 10;
  let board = generateBoard(3, 10);

  expect(board.length).toBe(height);
  expect(board[height - 1][width - 1]).toBeNull();
});

test("merge left working properly", () => {
  const input = [
    [{ value: 2 }, { value: 2 }, { value: 4 }, { value: 4 }],
    [{ value: 2 }, { value: 2 }, null, null],
    [null, null, { value: 4 }, { value: 4 }],
  ];

  const expected = [
    [{ value: 4 }, { value: 8 }, null, null],
    [{ value: 4 }, null, null, null],
    [{ value: 8 }, null, null, null],
  ];

  const result = leftOnlyValues(merge(input, directions.LEFT)[1]);

  expect(result).toEqual(expected);
});

test("merge right working properly", () => {
  const input = [
    [{ value: 2 }, { value: 2 }, { value: 4 }, { value: 4 }],
    [{ value: 2 }, { value: 2 }, null, null],
    [null, null, { value: 4 }, { value: 4 }],
  ];

  const expected = [
    [null, null, { value: 4 }, { value: 8 }],
    [null, null, null, { value: 4 }],
    [null, null, null, { value: 8 }],
  ];

  const result = leftOnlyValues(merge(input, directions.RIGHT)[1]);

  expect(result).toEqual(expected);
});

test("merge up working properly", () => {
  const input = [
    [{ value: 2 }, { value: 2 }, { value: 4 }, { value: 4 }],
    [{ value: 2 }, { value: 2 }, null, null],
    [null, null, { value: 4 }, { value: 4 }],
  ];

  const expected = [
    [{ value: 4 }, { value: 4 }, { value: 8 }, { value: 8 }],
    [null, null, null, null],
    [null, null, null, null],
  ];

  const result = leftOnlyValues(merge(input, directions.UP)[1]);

  expect(result).toEqual(expected);
});

test("merge down working properly", () => {
  const input = [
    [{ value: 2 }, { value: 2 }, { value: 4 }, { value: 4 }],
    [{ value: 2 }, { value: 2 }, null, null],
    [null, null, { value: 4 }, { value: 4 }],
  ];

  const expected = [
    [null, null, null, null],
    [null, null, null, null],
    [{ value: 4 }, { value: 4 }, { value: 8 }, { value: 8 }],
  ];

  const result = leftOnlyValues(merge(input, directions.DOWN)[1]);

  expect(result).toEqual(expected);
});

test("merge left working properly (three same numbers in row)", () => {
  const input = [
    [{ value: 2 }, { value: 2 }, { value: 2 }, { value: 4 }],
    [{ value: 2 }, { value: 2 }, null, null],
    [null, null, { value: 4 }, { value: 4 }],
  ];

  const expected = [
    [{ value: 4 }, { value: 2 }, { value: 4 }, null],
    [{ value: 4 }, null, null, null],
    [{ value: 8 }, null, null, null],
  ];

  const result = leftOnlyValues(merge(input, directions.LEFT)[1]);

  expect(result).toEqual(expected);
});

test("getFreePlace working properly", () => {
  const input = [
    [{ value: 4 }, { value: 4 }, { value: 4 }],
    [{ value: 4 }, { value: 4 }, { value: 4 }],
    [{ value: 4 }, { value: 4 }, null],
  ];
  const out = getFreePlace(input);
  const expected = [2, 2];

  expect(out).toEqual(expected);
});
