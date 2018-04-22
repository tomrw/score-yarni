import { MOVE_GAME_TO_HISTORY, REMOVE_HISTORY_ENTRY } from '../constants/history';

const moveGameToHistory = (state, game) => (
	[ ...state, game ]
);

const removeGameFromHistory = (state, id) => {
	return state.filter((item, index) => index !== id);
};

export default (state = [], action) => {
	switch (action.type) {
		case MOVE_GAME_TO_HISTORY:
			return moveGameToHistory(state, action.payload.game);
		case REMOVE_HISTORY_ENTRY:
			return removeGameFromHistory(state, action.payload.id);
		default:
			return state;
	}
};
