import { changeNavLocation, setWinners } from '../../src/action-creators/status';

describe('Given the `status` action creator', () => {
	describe('when changing the location', () => {
		const location = 'IN_GAME';
		const action = changeNavLocation(location);

		it('should return the correct type', () => {
			expect(action.type).toEqual('CHANGE_NAV_LOCATION');
		});

		it('should return the correct payload', () => {
			expect(action.payload).toEqual({
				location
			});
		});
	});

	describe('when setting the winners', () => {
		const winners = [ 'a', 'b' ];
		const action = setWinners(winners);

		it('should return the correct type', () => {
			expect(action.type).toEqual('SET_WINNERS');
		});

		it('should return the correct payload', () => {
			expect(action.payload).toEqual({
				winners
			});
		});
	});
});
