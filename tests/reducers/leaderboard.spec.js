import reduce from '../../src/reducers/leaderboard';
import { addScore } from '../../src/action-creators/score';
import { resetGame } from '../../src/action-creators/game';

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
			const newState = reduce(initialState, addScore(id, score));
			const expectedState = [
				{
					position: 1,
					scores: [
						{ id, score }
					]
				}
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
				{
					position: 1,
					scores: [
						{ id: score1.id, score: score1.score + score4.score }
					]
				},
				{
					position: 2,
					scores: [ { ...score3 } ]
				},
				{
					position: 3,
					scores: [ { ...score2 } ]
				}
			];

			expect(fourthState).toEqual(expectedState);
		});

		it('should combine tied scores', () => {
			const initialState = [
				{
					position: 1,
					scores: [ { id: 1, score: 100 } ]
				},
				{
					position: 2,
					scores: [ { id: 2, score: 80 } ]
				},
				{
					position: 3,
					scores: [ { id: 3, score: 50 } ]
				},
				{
					position: 4,
					scores: [ { id: 4, score: 12 } ]
				},
				{
					position: 5,
					scores: [
						{ id: 5, score: 0 },
						{ id: 6, score: 0 }
					]
				}
			];
			const secondState = reduce(initialState, addScore(5, 100));
			const thirdState = reduce(secondState, addScore(3, 30));
			const expectedState = [
				{
					position: 1,
					scores: [
						{ id: 1, score: 100 },
						{ id: 5, score: 100 }
					]
				},
				{
					position: 3,
					scores: [
						{ id: 2, score: 80 },
						{ id: 3, score: 80 }
					]
				},
				{
					position: 5,
					scores: [ { id: 4, score: 12 } ]
				},
				{
					position: 6,
					scores: [ { id: 6, score: 0 } ]
				}
			];

			expect(thirdState).toEqual(expectedState);
		});
	});

	describe('when resetting the game', () => {
		it('should reset the leaderboard', () => {
			const newState = reduce(initialState, addScore(1, 100));
			const nextState = reduce(newState, resetGame());

			expect(nextState).toEqual([]);
		});
	});
});
