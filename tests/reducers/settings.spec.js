import reduce from '../../src/reducers/settings';
import { changeSetting } from '../../src/action-creators/settings';

describe('Given the settings reducer', () => {
	const unknownAction = {
		type: 'UNKNOWN'
	};
	const initialState = reduce(undefined, unknownAction);

	it('should begin with an empty object', () => {
		expect(initialState).toEqual({});
	});

	describe('when changing a setting', () => {
		it('should set the `key/value` pairing', () => {
			const key = 'a';
			const value = 'b';
			const newState = reduce(initialState, changeSetting(key, value));
			const expectedState = {
				[ key ]: value
			};

			expect(newState).toEqual(expectedState);
		});

		it('should update an existing `key/value` pairing', () => {
			const key = 'a';
			const value1 = 'b';
			const value2 = 'c';
			const newState = reduce(initialState, changeSetting(key, value1));
			const nextState = reduce(newState, changeSetting(key, value2));
			const expectedState = {
				[key]: value2
			};

			expect(nextState).toEqual(expectedState);
		});
	});
});
