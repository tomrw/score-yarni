import { changeSetting } from '../../src/action-creators/settings';

describe('Given the `settings` action creator', () => {
	describe('when changing a setting', () => {
		const key = 'a';
		const value = 'b';
		const action = changeSetting(key, value);

		it('should return the correct type', () => {
			expect(action.type).toEqual('CHANGE_SETTING');
		});

		it('should return the correct payload', () => {
			expect(action.payload).toEqual({
				key,
				value
			});
		});
	});
});
