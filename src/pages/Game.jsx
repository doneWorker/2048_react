import React, { useState, useEffect } from "react";

import { BOARD_SIZE, generateBoard, addNewTile, mergeTiles } from "../game";
import useKeyPress from "../hooks/useKeypress";
import Tile from "../components/Tile";
import Board from "../components/Board";

export default function Game() {
  const [tiles, setTiles] = useState(generateBoard());

  const handleAddNewTile = () => {
    setTiles((prevState) => {
      console.log("updated", addNewTile(prevState));
      return addNewTile(prevState);
    });
  };

  const handleMerge = (dir = "LEFT") => {
    setTiles((prevState) => {
      let newState = mergeTiles(prevState, dir);
      return newState;
    });
  };

  useKeyPress("ArrowLeft", () => {
    handleMerge("LEFT");
    handleAddNewTile();
  });

  useKeyPress("ArrowRight", () => {
    handleMerge("RIGHT");
    handleAddNewTile();
  });

  useKeyPress("ArrowUp", () => {
    handleMerge("UP");
    handleAddNewTile();
  });

  useKeyPress("ArrowDown", () => {
    handleMerge("DOWN");
    handleAddNewTile();
  });

  useEffect(() => {
    handleAddNewTile();
  }, []);

  return (
    <div>
      <Board size={BOARD_SIZE}>
        {tiles &&
          tiles.map((el, idx) => {
            return (
              el !== null && (
                <Tile index={idx} key={idx} value={el.value} from={el.from} />
              )
            );
          })}
      </Board>
    </div>
  );
}
