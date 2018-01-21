import { NAVIGATE_TO } from '../constants/layout';

const navigateTo = (state, view, child) => {
	return {
		...state,
		view,
		child
	};
};

export default (state = {}, action) => {
	switch (action.type) {
		case NAVIGATE_TO:
			return navigateTo(state, action.payload.view, action.payload.child);
		default:
			return state;
	}
};
