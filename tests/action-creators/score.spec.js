import { addScore }from '../../src/action-creators/score';

describe('Given the `score` action creators', () => {
	describe('when adding a score', () => {
		const action = addScore(1, 100);

		it('should return the correct type', () => {
			expect(action.type).toEqual('ADD_SCORE');
		});

		it('should return the correct payload', () => {
			expect(action.payload).toEqual({
				id: 1,
				score: 100
			});
		});
	});
});
