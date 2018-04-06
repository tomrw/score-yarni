import {
	CHANGE_NAV_LOCATION,
	GAME_ENDED,
	RESET_GAME
} from '../constants/game';

const changeNavLocation = (state, location) => ({
	...state,
	location
});

const gameEnded = state => ({
	...state,
	ended: true
});

const resetGame = () => ({});

export default (state = {}, action) => {
	switch (action.type) {
		case CHANGE_NAV_LOCATION:
			return changeNavLocation(state, action.payload.location);
		case GAME_ENDED:
			return gameEnded(state);
		case RESET_GAME:
			return resetGame();
		default:
			return state;
	}
};
