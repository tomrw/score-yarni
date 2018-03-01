import { ADD_SCORE } from '../constants/score';
import { RESET_GAME } from '../constants/game';

const INITIAL_STATE = [];

const updateLeaderboard = (leaderboard, { id, score }) => {
	const playerScore = leaderboard.find(el => el.id === id);
	const newLeaderboard = [ ...leaderboard ];

	if (!playerScore) {
		newLeaderboard.push({ id, score: 0 });
	}

	return newLeaderboard
		.map(item => {
			const newScore = item.id === id ? item.score + score : item.score;

			return {
				id: item.id,
				score: newScore
			};
		})
		.sort((a, b) => a.score < b.score)
		.map((item, index) => {
			return {
				...item,
				position: index + 1
			};
		});
};

const resetLeaderboard = () => INITIAL_STATE;

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ADD_SCORE:
			return updateLeaderboard(state, action.payload);
		case RESET_GAME:
			return resetLeaderboard(state);
		default:
			return state;
	}
};
