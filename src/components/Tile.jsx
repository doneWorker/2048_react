import React, { useEffect, useState } from "react";
import { getTilePosition } from "../game";

import styles from "./Tile.module.css";

function Tile(props) {
  const { row, col, value, populated, prevPos } = props;
  const [position, setPosition] = useState(getTilePosition(...prevPos));

  useEffect(() => {
    setPosition(() => {
      setTimeout(() => setPosition(getTilePosition(row, col)), 10);
      return getTilePosition(...prevPos);
    });
  }, [row, col, prevPos, setPosition]);

  return (
    <div
      className={`${styles.tile} ${
        populated ? styles.populate : ""
      } tile tile-${value}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      {value}
    </div>
  );
}

export default React.memo(Tile);
