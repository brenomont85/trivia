import { ADD_PLAYER } from '../actions';

const INITIAL_STATE = {
  list: [],
};

const listRanking = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_PLAYER:
    return {
      ...state,
      list: [...state.list, action.payload],
    };

  default:
    return state;
  }
};

export default listRanking;
