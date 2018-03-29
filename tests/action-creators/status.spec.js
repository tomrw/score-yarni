import { changeStatus } from '../../src/action-creators/status';

describe('Given the `status` action creator', () => {
	describe('when changing the status', () => {
		const location = 'IN_GAME';
		const action = changeStatus(location);

		it('should return the correct type', () => {
			expect(action.type).toEqual('CHANGE_STATUS');
		});

		it('should return the correct payload', () => {
			expect(action.payload).toEqual({
				location
			});
		});
	});
});
