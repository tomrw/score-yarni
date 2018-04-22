import { MOVE_GAME_TO_HISTORY, REMOVE_HISTORY_ENTRY } from '../constants/history';

export const addGameToHistory = game => ({
	type: MOVE_GAME_TO_HISTORY,
	payload: {
		game
	}
});

export const removeGameFromHistory = id => ({
	type: REMOVE_HISTORY_ENTRY,
	payload: {
		id
	}
});
