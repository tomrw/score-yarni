import { StackNavigator, TabNavigator } from 'react-navigation';

import AddScores from '../components/in-game/add-scores';
import GameInfo from '../components/in-game/game-info';
import History from '../components/history/history';
import HistoryDetail from '../components/history/history-detail';
import HomePage from '../components/home-page';
import NewGame from '../components/new-game';
import Settings from '../components/settings/settings';
import { types } from '../constants/nav';

export const gameInProgressTabs = {
	gameInfo: { screen: GameInfo },
	addScores: { screen: AddScores }
};

export const screens = {
	[ types.HOME ]: { screen: HomePage },
	[ types.HISTORY ]: { screen: History },
	[ types.HISTORY_DETAIL ]: { screen: HistoryDetail },
	[ types.SETTINGS ]: { screen: Settings },
	[ types.NEW_GAME ]: { screen: NewGame },
	[ types.GAME_CONFIG ]: { screen: NewGame },
	[ types.GAME_IN_PROGRESS ]: {
		screen: TabNavigator(gameInProgressTabs, {
			animationEnabled: true,
			swipeEnabled: true,
			lazy: false,
			tabBarPosition: 'bottom',
			navigationOptions: {
				gesturesEnabled: false
			}
		})
	}
};

export const config = {
	initialRouteName: types.HOME,
	navigationOptions: {
		headerStyle: {
			backgroundColor: '#f4511e'
		},
		headerTintColor: '#fff',
		headerBackTitle: 'Back'
	}
};

const AppNavigator = StackNavigator(screens, config);

export default AppNavigator;
