import { RESET_GAME } from '../constants/game';
import {
	ADD_SCORE,
	ADD_PENDING_SCORE,
	CONFIRM_ALL_PENDING_SCORES
} from '../constants/score';

const INITIAL_STATE = {
	scores: [],
	pendingScores: []
};

const addScore = (state, { id, score }) => ({
	...state,
	scores: [ ...state.scores, { id, score } ]
});

const addPendingScore = (state, { id, score }) => {
	const existingScore = state.pendingScores.find(score => score.id === id);
	let newPendingScores;

	if (existingScore) {
		newPendingScores = state.pendingScores.map(pendingScore => {
			if (pendingScore.id === id) {
				return { id, score };
			} else {
				return pendingScore;
			}
		});
	}
	else {
		newPendingScores = [ ...state.pendingScores, { id, score } ];
	}

	return {
		...state,
		pendingScores: newPendingScores
	};
};

const resetGame = () => ({ ...INITIAL_STATE });

const resetPendingScores = state => ({
	...state,
	pendingScores: []
});

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ADD_SCORE:
			return addScore(state, action.payload);
		case ADD_PENDING_SCORE:
			return addPendingScore(state, action.payload);
		case RESET_GAME:
			return resetGame(state);
		case CONFIRM_ALL_PENDING_SCORES:
			return resetPendingScores(state);
		default:
			return state;
	}
};
