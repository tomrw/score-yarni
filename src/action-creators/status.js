import { CHANGE_NAV_LOCATION, SET_WINNERS } from '../constants/game';

export const changeNavLocation = location => ({
	type: CHANGE_NAV_LOCATION,
	payload: {
		location
	}
});

export const setWinners = winners => ({
	type: SET_WINNERS,
	payload: {
		winners
	}
});
