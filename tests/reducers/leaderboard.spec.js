import reduce from '../../src/reducers/leaderboard';
import { addScore } from '../../src/action-creators/score';

describe('Given the leaderboard reducer', () => {
	const unknownAction = {
		type: 'UNKNOWN'
	};
	const initialState = reduce(undefined, unknownAction);

	it('should begin with an empty leaderboard', () => {
		expect(initialState).toEqual([]);
	});

	describe('when adding a score', () => {
		it('should add the score to an empty leaderboard', () => {
			const id = 1;
			const score = 100;
			const position = 1;
			const newState = reduce(initialState, addScore(id, score));
			const expectedState = [
				{ id, position, score }
			];

			expect(newState).toEqual(expectedState);
		});

		it('should sort the leaderboard', () => {
			const score1 = { id: 1, score: 30 };
			const score2 = { id: 2, score: 20 };
			const score3 = { id: 3, score: 100 };
			const score4 = { id: 1, score: 80 };
			const firstState = reduce(initialState, addScore(score1.id, score1.score));
			const secondState = reduce(firstState, addScore(score2.id, score2.score));
			const thirdState = reduce(secondState, addScore(score3.id, score3.score));
			const fourthState = reduce(thirdState, addScore(score4.id, score4.score));
			const expectedState = [
				{ score: score1.score + score4.score, id: 1, position: 1 },
				{ ...score3, position: 2 },
				{ ...score2, position: 3 }
			];

			expect(fourthState).toEqual(expectedState);
		});
	});
});
