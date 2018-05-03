import { ADD_SCORE } from '../constants/score';
import { RESET_GAME } from '../constants/game';

const INITIAL_STATE = [];

const updateLeaderboard = (leaderboard, { id, score }) => {
	const scores = leaderboard.reduce((result, item) => {
		return result.concat(...item.scores);
	}, []);
	const playerScore = scores.find(el => el.id === id);

	if (!playerScore) {
		scores.push({ id, score: 0 });
	}

	const sortedScores = scores
		.map(item => {
			const newScore = item.id === id ? item.score + score : item.score;

			return {
				id: item.id,
				score: newScore
			};
		});

	sortedScores.sort((a, b) => {
		if (a.score > b.score) {
			return -1;
		} else if (a.score === b.score) {
			return 0;
		}

		return 1;
	});

	const groupedScores = sortedScores.reduce((result, item) => {
		const lastIndex = result.length - 1;

		if (result.length && result[ lastIndex ][0].score === item.score) {
			result[ lastIndex ].push(item);
		} else {
			result.push([ item ]);
		}

		return result;
	}, []);

	let positionCount = 1;
	const leaderboardWithPositions = groupedScores.map(item => {
		const position = positionCount;

		positionCount += item.length;

		return {
			scores: item,
			position
		};
	});

	return leaderboardWithPositions;
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
