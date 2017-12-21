import reduce from '../../src/reducers/game';
import { resetGame, setGameConfig } from '../../src/action-creators/new-game';

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
});
