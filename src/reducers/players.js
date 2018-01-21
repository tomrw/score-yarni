import {
	ADD_PLAYER,
	REMOVE_PLAYER,
	RESET_GAME
} from '../constants/game';

const addPlayer = (players, { name, id }) => {
	return [ ...players, { name, id } ];
};

const removePlayer = (players, idToRemove) => {
	return players.filter(({ id }) => {
		return id !== idToRemove;
	});
};

const resetPlayers = () => {
	return [];
};

export default (state = [], action) => {
	switch (action.type) {
		case ADD_PLAYER:
			return addPlayer(state, action.payload);
		case REMOVE_PLAYER:
			return removePlayer(state, action.payload.id);
		case RESET_GAME:
			return resetPlayers();
		default:
			return state;
	}
};
