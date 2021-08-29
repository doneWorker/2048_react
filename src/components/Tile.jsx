import React, { useState, useEffect } from "react";
import { BOARD_SIZE, TILE_SIZE, TILE_OFFSET } from "../game";
import styles from "./Tile.module.css";

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

export default function Tile({ index, value }) {
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
