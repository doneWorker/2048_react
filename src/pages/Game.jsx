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
    freeCells = getFreeCells(matrix),
    position = freeCells[getRandomIntInclusive(0, freeCells.length - 1)];

  return [randomNumber, position];
}

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

  useEffect(() => {
    setTiles((prevState) => {
      const [num, pos] = getNextTile(tiles);
      let newState = [...prevState];
      newState[pos] = num;
      return newState;
    });
  }, []);

  console.log(tiles);
  return (
    <Board size={BOARD_SIZE}>
      {tiles.map((el, idx) => {
        return el !== 0 && <Tile index={idx} key={idx} value={el} />;
      })}
    </Board>
  );
}
