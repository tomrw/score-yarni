import AppNavigator from '../navigation/app';

const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('HOME'));

export default (state = initialState, action) => {
	const nextState = AppNavigator.router.getStateForAction(action, state);

	return nextState || state;
};
