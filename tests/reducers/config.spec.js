import reduce from '../../src/reducers/config';
import { resetGame, setGameConfig } from '../../src/action-creators/game';

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
});
