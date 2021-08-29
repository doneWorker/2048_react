import { flatVertical, getCols } from "./index";

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
