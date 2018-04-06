import { CHANGE_NAV_LOCATION } from '../constants/game';

export const changeNavLocation = location => ({
	type: CHANGE_NAV_LOCATION,
	payload: {
		location
	}
});
