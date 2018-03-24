import { NavigationActions } from 'react-navigation';

import AppNavigator from '../navigation/app';

const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('HOME'));

export default (state = initialState, action) => {
	let nextState = AppNavigator.router.getStateForAction(action, state);

	if (state && action.type === NavigationActions.BACK) {
		if (state.routes[state.index].routeName === 'GAME_IN_PROGRESS') {
			nextState = AppNavigator.router.getStateForAction(
				NavigationActions.popToTop(),
				state
			);
		}
	}

	return nextState || state;
};
