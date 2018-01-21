import { ADD_SCORE } from '../constants/score';

export const addScore = (id, score) => ({
	type: ADD_SCORE,
	payload: {
		id,
		score
	}
});

