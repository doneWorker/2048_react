import { UPDATE_SCORE, CLEAR_SCORE } from "../actions/score.actions";

const scoreReducer = (state = 0, action) => {
  switch (action.type) {
    case UPDATE_SCORE:
      return action.payload.score;
    case CLEAR_SCORE:
      return 0;
    default:
      return state;
  }
};

export default scoreReducer;
