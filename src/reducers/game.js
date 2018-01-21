import { RESET_GAME, SET_GAME_CONFIG } from '../constants/game';

const INITIAL_STATE = {
	maxGameScore: 150
};

const maxGameScore = (state, maxGameScore) => {
	return {
		...state,
		maxGameScore
	};
};

const resetConfig = () => INITIAL_STATE;

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SET_GAME_CONFIG:
			return maxGameScore(state, action.payload.maxGameScore);
		case RESET_GAME:
			return resetConfig();
		default:
			return state;
	}
};
