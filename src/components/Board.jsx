import React from "react";
import { BOARD_SIZE } from "../game";
import styles from "./Board.module.css";

export default function Board({ children }) {
  return (
    <div className={styles.board}>
      <div className={styles.boardBackground}>
        {new Array(BOARD_SIZE).fill(0).map((el, idx) => {
          return <div className={styles.gridCell} key={idx} />;
        })}
      </div>
      {children}
    </div>
  );
}
