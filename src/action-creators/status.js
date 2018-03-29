import { CHANGE_STATUS } from '../constants/game';

export const changeStatus = location => ({
	type: CHANGE_STATUS,
	payload: {
		location
	}
});
