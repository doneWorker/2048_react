import React, { useState, useEffect } from "react";

import {
  BOARD_SIZE,
  generateBoard,
  addNewTile,
  merge,
  directions,
} from "../game";
import useKeyPress from "../hooks/useKeypress";
import Header from "../components/Header";
import Tile from "../components/Tile";
import Board from "../components/Board";

export default function Game() {
  const [tiles, setTiles] = useState(generateBoard());
  const [score, setScore] = useState(0);

  const handleAddNewTile = () => {
    setTiles((prevState) => {
      return addNewTile(prevState);
    });
  };

  const handleMerge = (dir) => {
    setTiles((prevState) => {
      let [points, tiles] = merge(prevState, dir);
      setScore((prevScore) => (prevScore += points));
      return tiles;
    });
  };

  useKeyPress("ArrowLeft", () => {
    handleMerge(directions.LEFT);
    handleAddNewTile();
  });

  useKeyPress("ArrowRight", () => {
    handleMerge(directions.RIGHT);
    handleAddNewTile();
  });

  useKeyPress("ArrowUp", () => {
    handleMerge(directions.UP);
    handleAddNewTile();
  });

  useKeyPress("ArrowDown", () => {
    handleMerge(directions.DOWN);
    handleAddNewTile();
  });

  useEffect(() => {
    setTiles((prevState) => {
      return addNewTile(prevState);
    });
  }, []);

  return (
    <div>
      <Header score={score} />
      <Board size={BOARD_SIZE}>
        {tiles &&
          tiles.map((row, rowIdx) => {
            return row.map((item, colIdx) => {
              return (
                item && (
                  <Tile
                    row={rowIdx}
                    col={colIdx}
                    value={item}
                    key={rowIdx + colIdx}
                  />
                )
              );
            });
          })}
      </Board>
    </div>
  );
}
