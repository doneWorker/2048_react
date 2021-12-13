import React, { useState, useEffect, useCallback } from "react";

import {
  BOARD_SIZE,
  generateBoard,
  addNewTile,
  merge,
  canMove,
  directions,
} from "../game";
import useKeyUp from "../hooks/useKeyUp";
import Header from "../components/Header";
import Tile from "../components/Tile";
import Board from "../components/Board";

function loadLastSession() {
  const state = localStorage.getItem("state");
  return state ? JSON.parse(state) : null;
}

function saveSession(state) {
  localStorage.setItem("state", JSON.stringify(state));
}

export default function Game() {
  const [tiles, setTiles] = useState(null);
  const [score, setScore] = useState(0);

  const handleSaveGame = useCallback(() => {
    saveSession({ tiles, score });
  }, [tiles, score]);

  const handleAddNewTile = useCallback(() => {
    setTiles((prevState) => {
      return addNewTile(prevState);
    });
  }, [setTiles]);

  const handleNewGame = useCallback(() => {
    setTiles(() => generateBoard());
    setScore(0);

    handleAddNewTile();
  }, [setScore, setTiles, handleAddNewTile]);

  const handleContinueGame = useCallback(
    (score, tiles) => {
      setTiles(() => tiles);
      setScore(score);
    },
    [setTiles, setScore]
  );

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

  useKeyUp(
    "ArrowLeft",
    useCallback(() => {
      handleMerge(directions.LEFT);
    }, [handleMerge])
  );

  useKeyUp(
    "ArrowRight",
    useCallback(() => {
      handleMerge(directions.RIGHT);
    }, [handleMerge])
  );

  useKeyUp(
    "ArrowUp",
    useCallback(() => {
      handleMerge(directions.UP);
    }, [handleMerge])
  );

  useKeyUp(
    "ArrowDown",
    useCallback(() => {
      handleMerge(directions.DOWN);
    }, [handleMerge])
  );

  useEffect(() => {
    const lastSession = loadLastSession();

    if (
      lastSession !== null &&
      lastSession?.tiles !== null &&
      lastSession?.score !== null
    ) {
      handleContinueGame(lastSession.score, lastSession.tiles);
    } else {
      handleNewGame();
    }
  }, [handleNewGame, handleContinueGame]);

  useEffect(() => {
    window.addEventListener("beforeunload", handleSaveGame);

    return () => {
      window.removeEventListener("beforeunload", handleSaveGame);
    };
  }, [handleSaveGame]);

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
