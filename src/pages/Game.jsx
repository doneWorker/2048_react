import React, { useState, useEffect, useCallback } from "react";

import {
  BOARD_SIZE,
  generateBoard,
  addNewTile,
  merge,
  canMove,
  directions,
} from "../game";
import useKeyPress from "../hooks/useKeypress";
import Header from "../components/Header";
import Tile from "../components/Tile";
import Board from "../components/Board";

export default function Game() {
  const [tiles, setTiles] = useState(generateBoard());
  const [score, setScore] = useState(0);

  const handleNewGame = () => {
    setTiles(generateBoard());
    setScore(0);

    handleAddNewTile();
  };

  const handleAddNewTile = useCallback(() => {
    setTiles((prevState) => {
      return addNewTile(prevState);
    });
  }, [setTiles]);

  const handleMerge = useCallback(
    (dir) => {
      if (!canMove(tiles, dir)) {
        return;
      }

      setTiles((prevState) => {
        let [points, tiles] = merge(prevState, dir);
        setScore((prevScore) => (prevScore += points));
        return tiles;
      });

      handleAddNewTile();
    },
    [setTiles, handleAddNewTile, tiles]
  );

  useKeyPress(
    "ArrowLeft",
    useCallback(() => {
      handleMerge(directions.LEFT);
    }, [handleMerge])
  );

  useKeyPress(
    "ArrowRight",
    useCallback(() => {
      handleMerge(directions.RIGHT);
    }, [handleMerge])
  );

  useKeyPress(
    "ArrowUp",
    useCallback(() => {
      handleMerge(directions.UP);
    }, [handleMerge])
  );

  useKeyPress(
    "ArrowDown",
    useCallback(() => {
      handleMerge(directions.DOWN);
    }, [handleMerge])
  );

  useEffect(() => {
    handleNewGame();
  }, []);

  return (
    <div>
      <Header score={score} onNewGame={handleNewGame} />
      <Board size={BOARD_SIZE}>
        {tiles &&
          tiles.map((row, rowIdx) => {
            return row.map((item, colIdx) => {
              return (
                item && (
                  <Tile
                    row={rowIdx}
                    col={colIdx}
                    populated={item.populated}
                    prevPos={item.prevPos}
                    value={item.value}
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
