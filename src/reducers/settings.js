import { CHANGE_SETTING } from '../constants/settings';

const changeSetting = (state, key, value) => ({
	...state,
	[ key ]: value
});

export default (state = {}, action) => {
	switch (action.type) {
		case CHANGE_SETTING:
			return changeSetting(state, action.payload.key, action.payload.value);
		default:
			return state;
	}
};
