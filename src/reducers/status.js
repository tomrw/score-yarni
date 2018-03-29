import { CHANGE_STATUS } from '../constants/game';

const changeStatus = (state, location) => ({
	...state,
	location
});

export default (state = {}, action) => {
	switch (action.type) {
		case CHANGE_STATUS:
			return changeStatus(state, action.payload.location);
		default:
			return state;
	}
};
