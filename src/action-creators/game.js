import { NavigationActions } from 'react-navigation';

import { addPendingScore, addScore } from './score';
import { changeStatus } from './status';
import { types } from '../constants/nav';
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

export const moveToGameConfig = () => {
	return dispatch => {
		dispatch(changeStatus(types.GAME_CONFIG));

		dispatch(NavigationActions.navigate({
			routeName: types.GAME_CONFIG,
			params: {
				playersConfirmed: true
			}
		}));
	};
};

export const startGame = () => {
	return (dispatch, getState) => {
		const { currentGame: { players } } = getState();

		players.forEach(({ id }) => {
			dispatch(addScore(id, 0));
			dispatch(addPendingScore(id, 0));
		});

		dispatch(changeStatus(types.GAME_IN_PROGRESS));

		dispatch(NavigationActions.navigate({
			routeName: types.GAME_IN_PROGRESS
		}));
	};
};
