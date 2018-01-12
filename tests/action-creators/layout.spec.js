import { navigateTo } from '../../src/action-creators/layout';

describe('Given the `layout` action creators', () => {
	describe('when navigating somewhere', () => {
		const action = navigateTo('somewhere');

		it('should return the correct type', () => {
			expect(action.type).toEqual('NAVIGATE_TO');
		});

		it('should return the correct payload', () => {
			expect(action.payload).toEqual({
				view: 'somewhere',
				child: null
			});
		});

		describe('with a child', () => {
			const action = navigateTo('somewhere', 'child');

			expect(action.payload).toEqual({
				view: 'somewhere',
				child: 'child'
			});
		});
	});
});
