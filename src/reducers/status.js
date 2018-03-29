import { CHANGE_STATUS, RESET_GAME } from '../constants/game';

const changeStatus = (state, location) => ({
	...state,
	location
});

const resetGame = () => ({});

export default (state = {}, action) => {
	switch (action.type) {
		case CHANGE_STATUS:
			return changeStatus(state, action.payload.location);
		case RESET_GAME:
			return resetGame();
		default:
			return state;
	}
};
