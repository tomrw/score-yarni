import reduce from '../../src/reducers/history';
import { addGameToHistory, removeGameFromHistory } from '../../src/action-creators/history';

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

	describe('when removing a game from history', () => {
		const game1 = 'a';
		const game2 = 'b';
		const game3 = 'c';

		it('should remove a game from history', () => {
			const newState = reduce(initialState, addGameToHistory(game1));
			const nextState = reduce(newState, removeGameFromHistory(0));

			expect(nextState).toHaveLength(0);
		});

		it('should remove a game from history when multiple entries exist', () => {
			const firstState = reduce(initialState, addGameToHistory(game1));
			const secondState = reduce(firstState, addGameToHistory(game2));
			const thirdState = reduce(secondState, addGameToHistory(game3));
			const removedState = reduce(thirdState, removeGameFromHistory(1));

			expect(removedState).toEqual([ game1, game3 ]);
		});
	});
});
