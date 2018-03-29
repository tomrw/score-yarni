import sinon from 'sinon';
import { NavigationActions } from 'react-navigation';

import reduce from '../../src/reducers/config';
import { addPendingScore, addScore } from '../../src/action-creators/score';
import { changeStatus } from '../../src/action-creators/status';
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

	describe('when resetting the config', () => {
		it('should reset the config to the initial state', () => {
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
			currentGame: {
				players
			}
		});
		const dispatch = sinon.stub();

		startGame()(dispatch, getState);

		players.forEach(({ name, id }) => {
			it(`should add a default score for ${ name }`, () => {
				const expected = addScore(id, 0);

				expect(dispatch.withArgs(expected).calledOnce).toBe(true);
			});

			it(`should add a pending score for ${ name }`, () => {
				const expected = addPendingScore(id, 0);

				expect(dispatch.withArgs(expected).calledOnce).toBe(true);
			});
		});

		it('should update the status to `GAME_IN_PROGRESS`', () => {
			const expected = changeStatus('GAME_IN_PROGRESS');

			expect(dispatch.withArgs(expected).calledOnce).toBe(true);
		});

		it('should navigate to `GAME_IN_PROGRESS`', () => {
			const expected = NavigationActions.navigate({
				routeName: 'GAME_IN_PROGRESS'
			});

			expect(dispatch.withArgs(expected).calledOnce).toBe(true);
		});
	});
});
