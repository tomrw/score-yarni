import reduce from '../../src/reducers/status';
import { changeStatus } from '../../src/action-creators/status';

describe('Given the status reducer', () => {
	const unknownAction = {
		type: 'UNKNOWN'
	};
	const initialState = reduce(undefined, unknownAction);

	it('should begin with an empty object', () => {
		expect(initialState).toEqual({});
	});

	describe('when changing the status', () => {
		const location = 'IN_GAME';

		it('should set the location', () => {
			const newState = reduce(initialState, changeStatus(location));
			const expectedState = {
				location
			};

			expect(newState).toEqual(expectedState);
		});

		it('should update an existing `key/value` pairing', () => {
			const newLocation = 'ADD_PLAYERS';
			const newState = reduce(initialState, changeStatus(location));
			const nextState = reduce(newState, changeStatus(newLocation));
			const expectedState = {
				location: newLocation
			};

			expect(nextState).toEqual(expectedState);
		});
	});
});
