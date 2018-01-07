import { ADD_SCORE } from '../constants/score';

const addScore = (scores, { id, score }) => {
	return [ ...scores, { id, score } ];
};

export default (state = [], action) => {
	switch (action.type) {
		case ADD_SCORE:
			return addScore(state, action.payload);
		default:
			return state;
	}
};
