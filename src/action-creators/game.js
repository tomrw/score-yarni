import {
	ADD_PLAYER,
	REMOVE_PLAYER,
	RESET_GAME,
	SET_GAME_CONFIG
} from '../constants/game';

let playerId = 1;

export const addPlayer = name => ({
	type: ADD_PLAYER,
	payload: {
		id: playerId++,
		name
	}
});

export const resetPlayerId = () => {
	playerId = 1;
};

export const removePlayer = id => ({
	type: REMOVE_PLAYER,
	payload: {
		id
	}
});

export const setGameConfig = maxGameScore => ({
	type: SET_GAME_CONFIG,
	payload: {
		maxGameScore
	}
});

export const resetGame = () => ({
	type: RESET_GAME
});
