import reduce from '../../src/reducers/score';
import { addScore } from '../../src/action-creators/score';

describe('Given the score reducer', () => {
	const unknownAction = {
		type: 'UNKNOWN'
	};
	const initialState = reduce(undefined, unknownAction);

	it('should begin with no scores', () => {
		expect(initialState).toEqual([]);
	});

	describe('when adding a score', () => {
		it('should add the score to the state', () => {
			const id = 1;
			const score = 100;
			const newState = reduce(initialState, addScore(id, score));
			const expectedState = [
				{ id, score }
			];

			expect(newState).toEqual(expectedState);
		});

		it('should add a second score to the state', () => {
			const id1 = 1;
			const id2 = 2;
			const score1 = 100;
			const score2 = 200;
			const initialState = reduce([], addScore(id1, score1));
			const newState = reduce(initialState, addScore(id2, score2));
			const expectedState = [
				{ id: id1, score: score1 },
				{ id: id2, score: score2 }
			];

			expect(newState).toEqual(expectedState);
		});
	});
});
