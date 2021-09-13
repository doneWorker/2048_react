import { combineReducers } from "redux";
import boardReducer from "./board.reducer";
import scoreReducer from "./score.reducer";

const rootReducer = combineReducers({
  boardReducer,
  scoreReducer,
});

export default rootReducer;
