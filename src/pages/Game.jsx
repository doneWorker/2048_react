import React, { useState, useEffect } from "react";

import { BOARD_SIZE, merge } from "../game";
import useKeyPress from "../hooks/useKeypress";
import Tile from "../components/Tile";
import Board from "../components/Board";

// UTILS
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
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

// console.log(merge());

// COMPONENTS
export default function Game() {
  const [tiles, setTiles] = useState(new Array(BOARD_SIZE).fill(0));

  const addNewTile = function () {
    console.log("add new");
    setTiles((prevState) => {
      const [num, pos] = getNextTile(prevState);
      if (num === 0) return;
      let newState = [...prevState];
      newState[pos] = num;
      return newState;
    });
  };

  const mergeTiles = (dir = "LEFT") => {
    setTiles((prevState) => {
      let newState = merge(prevState, dir);
      return newState;
    });
  };

  useKeyPress("ArrowLeft", () => {
    mergeTiles("LEFT");
    addNewTile();
  });

  useKeyPress("ArrowRight", () => {
    mergeTiles("RIGHT");
    addNewTile();
  });

  useKeyPress("ArrowUp", () => {
    mergeTiles("UP");
    addNewTile();
  });

  useKeyPress("ArrowDown", () => {
    mergeTiles("DOWN");
    addNewTile();
  });

  useEffect(() => {
    addNewTile();
  }, []);

  return (
    <div>
      <Board size={BOARD_SIZE}>
        {tiles.map((el, idx) => {
          return el !== 0 && <Tile index={idx} key={idx} value={el} />;
        })}
      </Board>
    </div>
  );
}
