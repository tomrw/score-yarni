import reduce from '../../src/reducers/score';
import { resetGame } from '../../src/action-creators/game';
import {
	addScore,
	addPendingScore,
	confirmPendingScores
} from '../../src/action-creators/score';

describe('Given the score reducer', () => {
	const unknownAction = {
		type: 'UNKNOWN'
	};
	const initialState = reduce(undefined, unknownAction);

	it('should begin with no scores', () => {
		expect(initialState.scores).toEqual([]);
	});

	it('should begin with no pending scores', () => {
		expect(initialState.pendingScores).toEqual([]);
	});

	describe('when adding a score', () => {
		it('should add the score', () => {
			const id = 1;
			const score = 100;
			const newState = reduce(initialState, addScore(id, score));
			const expectedState = [
				{ id, score }
			];

			expect(newState.scores).toEqual(expectedState);
		});

		it('should add another score', () => {
			const id1 = 1;
			const id2 = 2;
			const score1 = 100;
			const score2 = 200;
			const firstState = reduce(initialState, addScore(id1, score1));
			const newState = reduce(firstState, addScore(id2, score2));
			const expectedState = [
				{ id: id1, score: score1 },
				{ id: id2, score: score2 }
			];

			expect(newState.scores).toEqual(expectedState);
		});
	});

	describe('when adding a pending score', () => {
		it('should add the score', () => {
			const id = 2;
			const score = 200;
			const newState = reduce(initialState, addPendingScore(id, score));
			const expectedState = [
				{ id, score }
			];

			expect(newState.pendingScores).toEqual(expectedState);
		});

		it('should add another score', () => {
			const id1 = 3;
			const id2 = 4;
			const score1 = 300;
			const score2 = 400;
			const firstState = reduce(initialState, addPendingScore(id1, score1));
			const newState = reduce(firstState, addPendingScore(id2, score2));
			const expectedState = [
				{ id: id1, score: score1 },
				{ id: id2, score: score2 }
			];

			expect(newState.pendingScores).toEqual(expectedState);
		});

		it('should update a players score if they already have one', () => {
			const id = 5;
			const id2 = 6;
			const originalScore = 300;
			const newScore = 400;
			const score2 = 500;
			const firstState = reduce(initialState, addPendingScore(id, originalScore));
			const secondState = reduce(firstState, addPendingScore(id2, score2));
			const newState = reduce(secondState, addPendingScore(id, newScore));
			const expectedState = [
				{ id, score: newScore },
				{ id: id2, score: score2 }
			];

			expect(newState.pendingScores).toEqual(expectedState);
		});
	});

	describe('when resetting the game', () => {
		it('should reset all scores', () => {
			const newState = reduce(initialState, addScore(1, 100));
			const nextState = reduce(newState, resetGame());

			expect(nextState.scores).toEqual([]);
		});

		it('should reset all pending scores', () => {
			const newState = reduce(initialState, addPendingScore(1, 100));
			const nextState = reduce(newState, resetGame());

			expect(nextState.pendingScores).toEqual([]);
		});
	});

	describe('when confirming all pending scores', () => {
		it('should reset all pending scores', () => {
			const newState = reduce(initialState, addPendingScore(1, 100));
			const nextState = reduce(newState, confirmPendingScores());

			expect(nextState.pendingScores).toEqual([]);
		});
	});
});
