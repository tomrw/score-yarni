import { CHANGE_NAV_LOCATION, RESET_GAME } from '../constants/game';

const changeNavLocation = (state, location) => ({
	...state,
	location
});

const resetGame = () => ({});

export default (state = {}, action) => {
	switch (action.type) {
		case CHANGE_NAV_LOCATION:
			return changeNavLocation(state, action.payload.location);
		case RESET_GAME:
			return resetGame();
		default:
			return state;
	}
};
