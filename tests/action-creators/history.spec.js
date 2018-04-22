import { addGameToHistory, removeGameFromHistory } from '../../src/action-creators/history';

describe('Given the `history` action creator', () => {
	describe('when adding a game to history', () => {
		const game = { a: 1 };
		const action = addGameToHistory(game);

		it('should return the correct type', () => {
			expect(action.type).toEqual('MOVE_GAME_TO_HISTORY');
		});

		it('should return the correct payload', () => {
			expect(action.payload).toEqual({ game });
		});
	});

	describe('when removing a game from history', () => {
		const id = 10;
		const action = removeGameFromHistory(id);

		it('should return the correct type', () => {
			expect(action.type).toEqual('REMOVE_HISTORY_ENTRY');
		});

		it('should return the correct payload', () => {
			expect(action.payload).toEqual({ id });
		});
	});
});
