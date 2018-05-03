import sinon from 'sinon';
import { NavigationActions } from 'react-navigation';

import { addPendingScore, addScore } from '../../src/action-creators/score';
import { changeNavLocation, setWinners } from '../../src/action-creators/status';
import {
	addCurrentGameToHistory,
	addPlayer,
	calculateWinners,
	checkForEndGame,
	gameEnded,
	goHomeAndResetGame,
	moveToAddPlayers,
	moveToGameConfig,
	removePlayer,
	resetGame,
	resetPlayerId,
	resumeGame,
	setGameConfig,
	startGame
} from '../../src/action-creators/game';
import { addGameToHistory } from '../../src/action-creators/history';

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

	describe('when moving to add players', () => {
		const dispatch = sinon.stub();

		moveToAddPlayers()(dispatch);

		it('should reset the game', () => {
			const expected = resetGame();

			expect(dispatch.withArgs(expected).calledOnce).toBe(true);
		});

		it('should update the status to `NEW_GAME`', () => {
			const expected = changeNavLocation('NEW_GAME');

			expect(dispatch.withArgs(expected).calledOnce).toBe(true);
		});

		it('should navigate to `NEW_GAME`', () => {
			const expected = NavigationActions.navigate({
				routeName: 'NEW_GAME'
			});

			expect(dispatch.withArgs(expected).calledOnce).toBe(true);
		});
	});

	describe('when moving to game config', () => {
		const dispatch = sinon.stub();

		moveToGameConfig()(dispatch);

		it('should update the status to `GAME_CONFIG`', () => {
			const expected = changeNavLocation('GAME_CONFIG');

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
			const expected = changeNavLocation('GAME_IN_PROGRESS');

			expect(dispatch.withArgs(expected).calledOnce).toBe(true);
		});

		it('should navigate to `GAME_IN_PROGRESS`', () => {
			const expected = NavigationActions.navigate({
				routeName: 'GAME_IN_PROGRESS'
			});

			expect(dispatch.withArgs(expected).calledOnce).toBe(true);
		});
	});

	describe('when going home and resetting the game', () => {
		const dispatch = sinon.stub();

		goHomeAndResetGame()(dispatch);

		it('should reset the game', () => {
			const expected = resetGame();

			expect(dispatch.withArgs(expected).calledOnce).toBe(true);
		});

		it('should pop the navigation to the top', () => {
			const expected = NavigationActions.popToTop();

			expect(dispatch.withArgs(expected).calledOnce).toBe(true);
		});
	});

	describe('when resuming the game', () => {
		const dispatch = sinon.stub();
		const location = 'NEW_GAME';
		const getState = () => ({
			currentGame: {
				status: {
					location
				}
			}
		});

		resumeGame()(dispatch, getState);

		it('should navigate to the status location', () => {
			const expected = NavigationActions.navigate({
				routeName: location
			});

			expect(dispatch.withArgs(expected).calledOnce).toBe(true);
		});
	});

	describe('when checking for end game', () => {
		const dispatch = sinon.stub();

		const runTest = (equalTo = false, lessThan = false) => {
			const score = equalTo ? 100 : 110;
			const position1Score = lessThan ? 90 : score;
			const config = {
				maxGameScore: 100
			};
			const leaderboard = [
				{ id: 1, position: 1, score: position1Score },
				{ id: 2, position: 2, score: 20 },
				{ id: 3, position: 3, score: 5 }
			];
			const getState = () => ({
				currentGame: {
					config,
					leaderboard
				}
			});

			checkForEndGame()(dispatch, getState);
		};

		afterEach(() => dispatch.reset());

		it('should dispatch a `GAME_ENDED` action if a players score equals the `maxGameScore`', () => {
			runTest(true);

			const expected = gameEnded();

			expect(dispatch.withArgs(expected).calledOnce).toBe(true);
		});

		it('should dispatch a `GAME_ENDED` action if a players score exceeds the `maxGameScore`', () => {
			runTest(false);

			const expected = gameEnded();

			expect(dispatch.withArgs(expected).calledOnce).toBe(true);
		});

		it('should NOT dispatch a `GAME_ENDED` action if a players score is less than `maxGameScore`', () => {
			runTest(null, true);

			expect(dispatch.notCalled).toBe(true);
		});
	});

	describe('when calculating the winners', () => {
		const players = [
			{ id: 1, name: 'Tom' },
			{ id: 2, name: 'Fred' },
			{ id: 3, name: 'Jimmy' },
			{ id: 4, name: 'Chloe' }
		];
		const dispatch = sinon.stub();

		afterEach(() => dispatch.reset());

		it('should dispatch the `setWinners` action with the winner', () => {
			const leaderboard = [
				{ id: 1, position: 1, score: 100 },
				{ id: 2, position: 2, score: 20 },
				{ id: 3, position: 3, score: 5 }
			];
			const getState = () => ({
				currentGame: {
					leaderboard,
					players
				}
			});
			const expectedWinners = [ players[2].name ];
			const expected = setWinners(expectedWinners);

			calculateWinners()(dispatch, getState);

			expect(dispatch.withArgs(expected).calledOnce).toBe(true);
		});

		describe('when there is a tie', () => {
			it('should dispatch the `setWinners` action with the winners', () => {
				const leaderboard = [
					{ id: 1, position: 1, score: 100 },
					{ id: 2, position: 2, score: 20 },
					{ id: 3, position: 3, score: 20 },
					{ id: 4, position: 4, score: 20 }
				];
				const getState = () => ({
					currentGame: {
						leaderboard,
						players
					}
				});
				const expectedWinners = [ players[1].name, players[2].name, players[3].name ];
				const expected = setWinners(expectedWinners);

				calculateWinners()(dispatch, getState);

				expect(dispatch.withArgs(expected).calledOnce).toBe(true);
			});
		});
	});

	describe('when adding the current game to history', () => {
		const leaderboard = [ 'a', 'b' ];
		const players = [ 'c', 'd' ];
		const scores = {
			scores: [ 'e', 'f', 'g' ]
		};
		const winners = [ 'g' ];
		const status = {
			winners
		};
		const getState = () => ({
			currentGame: {
				leaderboard,
				players,
				scores,
				status
			}
		});
		const dispatch = sinon.stub();

		addCurrentGameToHistory()(dispatch, getState);

		it('should dispatch the `addGameToHistory` action', () => {
			const expected = addGameToHistory({
				leaderboard,
				scores: scores.scores,
				players,
				winners
			});

			expect(dispatch.withArgs(expected).calledOnce).toBe(true);
		});
	});
});
