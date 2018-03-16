import { StackNavigator } from 'react-navigation';

import History from '../components/history/history';
import HistoryDetail from '../components/history/history-detail';
import HomePage from '../components/home-page';
import InGame from '../components/in-game';
import NewGame from '../components/new-game';
import Settings from '../components/settings/settings';
import { subTypes, types } from '../constants/layout';

export const screens = {
	[ types.HOME ]: { screen: HomePage },
	[ types.HISTORY ]: { screen: History },
	[ subTypes.HISTORY_DETAIL ]: { screen: HistoryDetail },
	[ types.SETTINGS ]: { screen: Settings },
	[ types.NEW_GAME ]: { screen: NewGame },
	[ types.GAME_CONFIG ]: { screen: NewGame },
	[ types.GAME_IN_PROGRESS ]: { screen: InGame }
};

const AppNavigator = StackNavigator(screens, {
	initialRouteName: types.HOME,
	navigationOptions: {
		headerStyle: {
			backgroundColor: '#f4511e'
		},
		headerTintColor: '#fff',
		headerBackTitle: 'Back'
	}
});

export default AppNavigator;
