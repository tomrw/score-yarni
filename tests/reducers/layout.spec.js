import reduce from '../../src/reducers/layout';
import { navigateTo } from '../../src/action-creators/layout';

describe('Given the layout reducer', () => {
	const unknownAction = {
		type: 'UNKNOWN'
	};
	const initialState = reduce(undefined, unknownAction);

	it('should begin with an empty object', () => {
		expect(initialState).toEqual({});
	});

	describe('when navigating somewhere', () => {
		it('should set the states `view`', () => {
			const newState = reduce(initialState, navigateTo('somewhere'));
			const expectedState = {
				view: 'somewhere'
			};

			expect(newState).toEqual(expectedState);
		});

		it('should set the states sub view if provided', () => {
			const newState = reduce(initialState, navigateTo('a', 'b'));
			const expectedState = {
				view: 'a',
				child: 'b'
			};

			expect(newState).toEqual(expectedState);
		});
	});
});
