import { AMOUNT_ASSERT, LOGIN_ACESS, RESET_SCORE, SCORE_USER } from '../actions/index';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN_ACESS: {
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.email,
    };
  }

  case AMOUNT_ASSERT: {
    return {
      ...state,
      assertions: action.payload,
    };
  }

  case SCORE_USER: {
    return {
      ...state,
      score: state.score + action.payload,
    };
  }

  case RESET_SCORE: {
    return {
      ...state,
      name: '',
      score: 0,
      assertions: 0,
      gravatarEmail: '',
    };
  }

  default: return state;
  }
};

export default player;
