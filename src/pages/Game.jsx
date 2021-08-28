import React, { useState, useEffect } from "react";
import styles from "./Game.module.css";

// TODO: change board dynamic
const BOARD_SIZE = 16;
const TILE_SIZE = 180;
const TILE_OFFSET = 15;

// UTILS
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getTilePosition(
  index,
  boardSize = BOARD_SIZE,
  tileSize = TILE_SIZE,
  margin = TILE_OFFSET
) {
  const w = boardSize / 4,
    r = index % w,
    c = Math.floor(index / w),
    mx = margin * (r + 1),
    my = margin * (c + 1);

  return {
    x: mx + r * tileSize,
    y: my + c * tileSize,
  };
}

function getNextTile(matrix) {
  const getFreeCells = (matrix) => {
    const freeCells = [];
    matrix.forEach((_, i) => matrix[i] === 0 && freeCells.push(i));
    return freeCells;
  };

  const possibleNumbers = [2, 4],
    randomNumber =
      possibleNumbers[getRandomIntInclusive(0, possibleNumbers.length - 1)],
    freeCells = getFreeCells(matrix);

  if (freeCells.length > 0) {
    const position = freeCells[getRandomIntInclusive(0, freeCells.length - 1)];
    return [randomNumber, position];
  } else {
    return [0, 0];
  }
}

// in state
/*
const state = [
    0, 2, 0, 0,
    2, 0, 0, 0,
    4, 0, 4, 0,
    8, 0, 0, 0
]

const state = [
    2, 0, 0, 0,
    2, 0, 0, 0,
    4, 4, 0, 0,
    8, 0, 0, 0
]
*/
// TODO: optimize merging
function merge(state, dir = "LEFT") {
  // const state = [0, 2, 0, 0, 2, 0, 0, 0, 4, 0, 4, 0, 8, 0, 0, 0];
  const w = 4;

  const getRows = (board) => {
    let rows = [];
    let currentRow = [];
    board.forEach((item, idx) => {
      currentRow.push(item);
      if ((idx + 1) % w === 0) {
        rows.push(currentRow);
        currentRow = [];
      }
    });

    return rows;
  };

  const rows = getRows(state);
  const cols = [];

  return rows
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

      let r =
        updatedRow.length < w
          ? [...updatedRow, ...new Array(w - updatedRow.length).fill(0)]
          : updatedRow;

      console.log(r);
      return r;
    })
    .flat();
}

// console.log(merge());

// COMPONENTS
function Tile({ index, value }) {
  const [pos, setPos] = useState(getTilePosition(index));

  useEffect(() => {
    setPos(() => getTilePosition(index));
  }, [index]);

  return (
    <div
      className={styles.tile}
      style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
    >
      {value}
    </div>
  );
}

function Board({ children }) {
  return (
    <div className={styles.board}>
      <div className={styles.boardBackground}>
        {new Array(BOARD_SIZE).fill(0).map((el, idx) => {
          return <div className={styles.gridCell} key={idx} />;
        })}
      </div>
      {children}
    </div>
  );
}

export default function Game() {
  const [tiles, setTiles] = useState(new Array(BOARD_SIZE).fill(0));

  const addNewTile = function () {
    setTiles((prevState) => {
      console.log("prevState", prevState);
      const [num, pos] = getNextTile(prevState);
      if (num === 0) return;
      let newState = merge(prevState);
      newState[pos] = num;
      return newState;
    });
  };

  const moveUp = () => {};

  const moveRight = () => {};

  const moveLeft = () => {};

  const moveDown = () => {};

  return (
    <div onClick={addNewTile}>
      <Board size={BOARD_SIZE}>
        {tiles.map((el, idx) => {
          return el !== 0 && <Tile index={idx} key={idx} value={el} />;
        })}
      </Board>
    </div>
  );
}
