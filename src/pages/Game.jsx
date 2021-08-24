import React, { useState, useEffect } from "react";
import styles from "./Game.module.css";

// TODO: change board dynamic
const BOARD_SIZE = 16;
const TILE_SIZE = 200;
const TILE_OFFSET = 10;

// UTILS
function getNextNumber(score) {
  return 2;
}

function getTilePosition(
  index,
  boardSize = BOARD_SIZE,
  tileSize = TILE_SIZE,
  margin = TILE_OFFSET
) {
  const w = boardSize / 4;
  const m = (index % w) * margin;
  const yPos = Math.ceil((index + 1) / w) - 1;

  return {
    x: m + (index % w) * tileSize + m,
    y: yPos * tileSize,
  };
}

function Tile({ index }) {
  const [pos, setPos] = useState(getTilePosition(index));

  useEffect(() => {
    setPos(() => getTilePosition(index));
  }, [index]);

  return (
    <div
      className={styles.tile}
      style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
    >
      1
    </div>
  );
}

function Board({ children }) {
  return (
    <div className={styles.board}>
      <div>
        {new Array(BOARD_SIZE).fill(0).map((el, idx) => {
          return <div className={styles.gridCell} key={idx} />;
        })}
      </div>
      {/* {children} */}
    </div>
  );
}

export default function Game() {
  return (
    <Board size={BOARD_SIZE}>
      {new Array(BOARD_SIZE).fill(0).map((el, idx) => {
        return <Tile index={idx} key={idx} />;
      })}
    </Board>
  );
}
