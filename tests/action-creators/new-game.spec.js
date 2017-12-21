import {
	addPlayer,
	removePlayer,
	resetGame,
	resetPlayerId,
	setGameConfig
} from '../../src/action-creators/new-game';

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
});
