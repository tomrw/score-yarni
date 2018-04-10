import { NavigationActions } from 'react-navigation';

import { addPendingScore, addScore } from './score';
import { changeNavLocation, setWinners } from './status';
import { types } from '../constants/nav';
import {
	ADD_PLAYER,
	GAME_ENDED,
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

export const moveToAddPlayers = () => {
	return dispatch => {
		dispatch(resetGame());
		dispatch(changeNavLocation(types.NEW_GAME));

		dispatch(NavigationActions.navigate({
			routeName: types.NEW_GAME
		}));
	};
};

export const moveToGameConfig = () => {
	return dispatch => {
		dispatch(changeNavLocation(types.GAME_CONFIG));

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

		dispatch(changeNavLocation(types.GAME_IN_PROGRESS));

		dispatch(NavigationActions.navigate({
			routeName: types.GAME_IN_PROGRESS
		}));
	};
};

export const goHomeAndResetGame = () => {
	return dispatch => {
		dispatch(resetGame());
		dispatch(NavigationActions.popToTop());
	};
};

export const resumeGame = () => {
	return (dispatch, getState) => {
		const { currentGame } = getState();
		const { status } = currentGame;

		dispatch(NavigationActions.navigate({
			routeName: status.location
		}));
	};
};

export const checkForEndGame = () => {
	return (dispatch, getState) => {
		const { currentGame } = getState();
		const { config, leaderboard } = currentGame;
		const { maxGameScore } = config;
		const scoresExceedingMax = leaderboard.filter(({ score }) => {
			return score >= maxGameScore;
		});

		if (scoresExceedingMax.length) {
			dispatch(gameEnded());
		}
	};
};

export const calculateWinners = () => {
	return (dispatch, getState) => {
		const { currentGame } = getState();
		const { leaderboard, players } = currentGame;
		const lastLeaderboardentry = leaderboard[ leaderboard.length - 1 ];
		const { score: winningScore } = lastLeaderboardentry;
		const winners = leaderboard.filter(({ score }) => winningScore === score);
		const playerNames = winners.map(({ id }) => {
			return players.find(player => player.id === id).name;
		});

		dispatch(setWinners(playerNames));
	};
};

export const gameEnded = () => ({
	type: GAME_ENDED
});
