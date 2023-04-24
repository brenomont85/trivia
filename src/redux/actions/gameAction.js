import { ADD_PLAYER, AMOUNT_ASSERT, RESET_SCORE, SCORE_USER } from '.';

export const userScore = (payload) => ({
  type: SCORE_USER,
  payload,
});

export const amountHits = (payload) => ({
  type: AMOUNT_ASSERT,
  payload,
});

export const addPlayer = (payload) => ({
  type: ADD_PLAYER,
  payload,
});

export const resetScore = () => ({
  type: RESET_SCORE,
});
