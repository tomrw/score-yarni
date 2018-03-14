import {
	createReactNavigationReduxMiddleware, // eslint-disable-line import/named
	createReduxBoundAddListener // eslint-disable-line import/named
} from 'react-navigation-redux-helpers';

export const navigationMiddleware = createReactNavigationReduxMiddleware(
	'root',
	state => state.nav
);

export const addListener = createReduxBoundAddListener('root');
