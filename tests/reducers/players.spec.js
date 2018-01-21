import reduce from '../../src/reducers/players';
import {
	addPlayer,
	removePlayer,
	resetGame,
	resetPlayerId
} from '../../src/action-creators/game';

describe('Given the players reducer', () => {
	const unknownAction = {
		type: 'UNKNOWN'
	};
	const initialState = reduce(undefined, unknownAction);

	beforeEach(resetPlayerId);

	it('should begin with zero players', () => {
		expect(initialState).toEqual([]);
	});

	describe('when adding a player', () => {
		it('should add the new player to the state', () => {
			const name = 'tomrw';
			const newState = reduce(initialState, addPlayer(name));
			const expectedState = [
				{ name, id: 1 }
			];

			expect(newState).toEqual(expectedState);
		});

		it('should add a second player to the state', () => {
			const player1 = 'player1';
			const player2 = 'player';
			const initialState = reduce([], addPlayer(player1));
			const newState = reduce(initialState, addPlayer(player2));
			const expectedState = [
				{ name: player1, id: 1 },
				{ name: player2, id: 2 }
			];

			expect(newState).toEqual(expectedState);
		});
	});

	describe('when removing a player', () => {
		it('should remove only the specified player', () => {
			const initialState = reduce([], addPlayer('player1'));
			let nextState = reduce(initialState, addPlayer('player2'));

			nextState = reduce(nextState, removePlayer(1));

			expect(nextState).toEqual([
				{ name: 'player2', id: 2 }
			]);
		});

		it('should NOT remove a player that is NOT in the state', () => {
			const initialState = reduce([], addPlayer('player1'));
			const newState = reduce(initialState, removePlayer(1234));

			expect(newState).toEqual([
				{ name: 'player1', id: 1 }
			]);
		});
	});

	describe('when resetting the players', () => {
		it('should remove all the players', () => {
			const player1 = 'player1';
			const player2 = 'player';
			const initialState = reduce([], addPlayer(player1));
			let nextState = reduce(initialState, addPlayer(player2));

			nextState = reduce(nextState, resetGame());

			expect(nextState).toEqual([]);
		});
	});
});
