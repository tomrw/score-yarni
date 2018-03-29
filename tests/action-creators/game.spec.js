import sinon from 'sinon';
import { NavigationActions } from 'react-navigation';

import { addPendingScore, addScore } from '../../src/action-creators/score';
import { changeStatus } from '../../src/action-creators/status';
import {
	addPlayer,
	moveToGameConfig,
	removePlayer,
	resetGame,
	resetPlayerId,
	setGameConfig,
	startGame
} from '../../src/action-creators/game';

describe('Given the `newGame` action creators', () => {
	beforeEach(resetPlayerId);

	describe('when adding a player', () => {
		const action = addPlayer('tomrw');

		it('should return the correct type', () => {
			expect(action.type).toEqual('ADD_PLAYER');
		});

		it('should return the correct payload', () => {
			expect(action.payload).toEqual({
				name: 'tomrw',
				id: 1
			});
		});

		it('should increment the `playerId` after adding a player', () => {
			addPlayer('player 1');

			const action = addPlayer('player 2');

			expect(action.payload.id).toEqual(2);
		});
	});

	describe('when removing a player', () => {
		const action = removePlayer(1);

		it('should return the correct type', () => {
			expect(action.type).toEqual('REMOVE_PLAYER');
		});

		it('should return the correct payload', () => {
			expect(action.payload).toEqual({
				id: 1
			});
		});
	});

	describe('when setting the game config', () => {
		const action = setGameConfig(1);

		it('should return the correct type', () => {
			expect(action.type).toEqual('SET_GAME_CONFIG');
		});

		it('should return the correct payload', () => {
			expect(action.payload).toEqual({
				maxGameScore: 1
			});
		});
	});

	describe('when resetting the game', () => {
		const action = resetGame();

		it('should return the correct type', () => {
			expect(action.type).toEqual('RESET_GAME');
		});

		it('should NOT return a payload', () => {
			expect(action.payload).toBeUndefined();
		});
	});

	describe('when moving to game config', () => {
		const dispatch = sinon.stub();

		moveToGameConfig()(dispatch);

		it('should update the status to `GAME_CONFIG`', () => {
			const expected = changeStatus('GAME_CONFIG');

			expect(dispatch.withArgs(expected).calledOnce).toBe(true);
		});

		it('should navigate to `GAME_CONFIG`', () => {
			const expected = NavigationActions.navigate({
				routeName: 'GAME_CONFIG',
				params: {
					playersConfirmed: true
				}
			});

			expect(dispatch.withArgs(expected).calledOnce).toBe(true);
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
