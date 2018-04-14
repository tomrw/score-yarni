import reduce from '../../src/reducers/history';
import { addGameToHistory } from '../../src/action-creators/history';

describe('Given the game reducer', () => {
	const unknownAction = {
		type: 'UNKNOWN'
	};
	const initialState = reduce(undefined, unknownAction);

	it('should begin with the correct default state', () => {
		expect(initialState).toEqual([]);
	});

	describe('when moving a game to history', () => {
		const game = { config: { a: 1 }, leaderboard: [], players: [], scores: [] };
		const game2 = { config: { b: 2 }, leaderboard: [], players: [], scores: [] };

		it('should add a game to the history', () => {
			const newState = reduce(initialState, addGameToHistory(game));
			const expectedState = [ game ];

			expect(newState).toEqual(expectedState);
		});

		it('should add a second game to the history', () => {
			const newState = reduce(initialState, addGameToHistory(game));
			const nextState = reduce(newState, addGameToHistory(game2));
			const expectedState = [ game, game2 ];

			expect(nextState).toEqual(expectedState);
		});
	});
});
