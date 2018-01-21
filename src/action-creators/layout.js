import { NAVIGATE_TO } from '../constants/layout';

export const navigateTo = (view, child = null) => ({
	type: NAVIGATE_TO,
	payload: {
		view,
		child
	}
});
