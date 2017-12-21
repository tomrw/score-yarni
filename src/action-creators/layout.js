import { NAVIGATE_TO } from '../constants/layout';

export const navigateTo = view => ({
	type: NAVIGATE_TO,
	payload: {
		view
	}
});
