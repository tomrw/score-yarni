import { NAVIGATE_TO } from '../constants/layout';

const navigateTo = (state, view) => {
	return {
		...state,
		view
	};
};

export default (state = {}, action) => {
	switch (action.type) {
		case NAVIGATE_TO:
			return navigateTo(state, action.payload.view);
		default:
			return state;
	}
};