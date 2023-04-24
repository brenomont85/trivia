import { combineReducers } from 'redux';
import player from './player';
import listRanking from './listRanking';

const rootReducer = combineReducers({ player, listRanking });

export default rootReducer;
