import React from "react";
import { getTilePosition } from "../game";

import styles from "./Tile.module.css";

export default function Tile({ row, col, value }) {
  return (
    <div
      className={`${styles.tile}`}
      style={{
        left: `${getTilePosition(row, col).x}px`,
        top: `${getTilePosition(row, col).y}px`,
      }}
    >
      {value}
    </div>
  );
}
