import sinon from 'sinon';

import {
	addScore,
	addPendingScore,
	confirmPendingScores,
	confirmAllPendingScores
}from '../../src/action-creators/score';

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

	describe('when adding a pending score', () => {
		const action = addPendingScore(2, 200);

		it('should return the correct type', () => {
			expect(action.type).toEqual('ADD_PENDING_SCORE');
		});

		it('should return the correct payload', () => {
			expect(action.payload).toEqual({
				id: 2,
				score: 200
			});
		});
	});

	describe('when confirming the pending scores', () => {
		const pendingScores = [
			{ id: 1, score: 100 },
			{ id: 2, score: 200 }
		];
		const getState = () => ({
			scores: {
				pendingScores
			}
		});
		const dispatch = sinon.stub();

		confirmAllPendingScores()(dispatch, getState);

		it('should call dispatch with the `CONFIRM_ALL_PENDING_SCORES` type', () => {
			const expectedAction = confirmPendingScores();

			expect(dispatch.withArgs(expectedAction).calledOnce).toBe(true);
		});

		pendingScores.forEach(({ id, score }) => {
			it(`should add a score for player with id: ${ id }`, () => {
				const expected = addScore(id, score);

				expect(dispatch.withArgs(expected).calledOnce).toBe(true);
			});

			it(`should add a pending score for player with id: ${ id }`, () => {
				const expected = addPendingScore(id, 0);

				expect(dispatch.withArgs(expected).calledOnce).toBe(true);
			});
		});
	});
});
