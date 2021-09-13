import {
  MOVE_LEFT,
  MOVE_RIGHT,
  MOVE_DOWN,
  MOVE_UP,
} from "../actions/board.actions";

import { merge, directions } from "../../game";

const boardReducer = (state = [], action) => {
  switch (action.type) {
    case MOVE_LEFT:
      return merge(state, directions.LEFT);
    case MOVE_RIGHT:
      return merge(state, directions.RIGHT);
    case MOVE_DOWN:
      return merge(state, directions.DOWN);
    case MOVE_UP:
      return merge(state, directions.UP);
    default:
      return state;
  }
};

export default boardReducer;
