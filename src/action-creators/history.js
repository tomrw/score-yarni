import { MOVE_GAME_TO_HISTORY } from '../constants/history';

export const addGameToHistory = game => ({
	type: MOVE_GAME_TO_HISTORY,
	payload: {
		game
	}
});
