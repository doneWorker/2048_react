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

export default function Tile({ index, value, from }) {
  const [offset, setOffset] = useState(null);

  useEffect(() => {
    let fromOffset = getTilePosition(from || index);
    let toOffset = getTilePosition(index);

    setOffset(fromOffset);
    setTimeout(() => setOffset(toOffset), 100);
  }, [from, index]);

  return (
    offset && (
      <div
        className={styles.tile}
        style={{ left: `${offset.x}px`, top: `${offset.y}px` }}
      >
        {value}
      </div>
    )
  );
}
