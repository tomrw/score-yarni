import { MOVE_GAME_TO_HISTORY } from '../constants/history';

const moveGameToHistory = (state, game) => (
	[ ...state, game ]
);

export default (state = [], action) => {
	switch (action.type) {
		case MOVE_GAME_TO_HISTORY:
			return moveGameToHistory(state, action.payload.game);
		default:
			return state;
	}
};
