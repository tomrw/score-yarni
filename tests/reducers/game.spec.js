import sinon from 'sinon';

import reduce from '../../src/reducers/game';
import { addScore } from '../../src/action-creators/score';
import { resetGame, setGameConfig, startGame } from '../../src/action-creators/game';

describe('Given the game reducer', () => {
	const unknownAction = {
		type: 'UNKNOWN'
	};
	const initialState = reduce(undefined, unknownAction);

	it('should begin with the correct default state', () => {
		expect(initialState).toEqual({
			maxGameScore: 150
		});
	});

	describe('when setting the config', () => {
		it('should set the states `maxGameScore`', () => {
			const newState = reduce(initialState, setGameConfig(10));
			const expectedState = {
				maxGameScore: 10
			};

			expect(newState).toEqual(expectedState);
		});
	});

	describe('when resetting the players', () => {
		it('should remove all the players', () => {
			const newState = reduce(initialState, setGameConfig(10));
			const nextState = reduce(newState, resetGame());

			expect(nextState).toEqual({
				maxGameScore: 150
			});
		});
	});

	describe('when starting the game', () => {
		const players = [
			{ name: 'player1', id: 1 },
			{ name: 'player2', id: 2 }
		];
		const getState = () => ({
			players
		});
		const dispatch = sinon.stub();

		startGame()(dispatch, getState);

		players.forEach(({ name, id }) => {
			it(`should add a default score for ${ name }`, () => {
				const expected = addScore(id, 0);

				expect(dispatch.withArgs(expected).calledOnce).toBe(true);
			});
		});
	});
});
