import reduce from '../../src/reducers/status';
import { changeNavLocation } from '../../src/action-creators/status';
import { resetGame } from '../../src/action-creators/game';

describe('Given the status reducer', () => {
	const unknownAction = {
		type: 'UNKNOWN'
	};
	const initialState = reduce(undefined, unknownAction);

	it('should begin with an empty object', () => {
		expect(initialState).toEqual({});
	});

	describe('when changing the nav location', () => {
		const location = 'IN_GAME';

		it('should set the location', () => {
			const newState = reduce(initialState, changeNavLocation(location));
			const expectedState = {
				location
			};

			expect(newState).toEqual(expectedState);
		});

		it('should update the location', () => {
			const newLocation = 'ADD_PLAYERS';
			const newState = reduce(initialState, changeNavLocation(location));
			const nextState = reduce(newState, changeNavLocation(newLocation));
			const expectedState = {
				location: newLocation
			};

			expect(nextState).toEqual(expectedState);
		});
	});

	describe('when resetting the game', () => {
		it('should reset the status', () => {
			const location = 'GAME_CONFIG';
			const newState = reduce(initialState, changeNavLocation(location));
			const nextState = reduce(newState, resetGame());

			expect(nextState).toEqual({});
		});
	});
});
