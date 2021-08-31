import React, { useState, useEffect } from "react";
import { getTilePosition } from "../game";
import styles from "./Tile.module.css";

export default function Tile({ index, value, from }) {
  const [offset, setOffset] = useState(null);

  useEffect(() => {
    let fromOffset = getTilePosition(from !== null ? from : index);
    let toOffset = getTilePosition(index);

    setOffset(fromOffset);
    setTimeout(() => setOffset(toOffset), 100);
  }, [from, index]);

  return (
    offset !== null && (
      <div
        className={styles.tile}
        style={{ left: `${offset.x}px`, top: `${offset.y}px` }}
      >
        {value}
      </div>
    )
  );
}
