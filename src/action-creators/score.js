import {
	ADD_SCORE,
	ADD_PENDING_SCORE,
	CONFIRM_ALL_PENDING_SCORES
} from '../constants/score';

export const addScore = (id, score) => ({
	type: ADD_SCORE,
	payload: {
		id,
		score
	}
});

export const addPendingScore = (id, score) => ({
	type: ADD_PENDING_SCORE,
	payload: {
		id,
		score
	}
});

export const confirmAllPendingScores = () => {
	return (dispatch, getState) => {
		const { scores: { pendingScores } } = getState();

		pendingScores.forEach(({ id, score }) => {
			dispatch(addScore(id, score));
		});

		dispatch(confirmPendingScores());
	};
};

export const confirmPendingScores = () => ({
	type: CONFIRM_ALL_PENDING_SCORES
});
