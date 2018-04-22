import GameInfo from '../../src/components/in-game/game-info';
import History from '../../src/components/history/history';
import HistoryDetail from '../../src/components/history/history-detail';
import HomePage from '../../src/components/home-page';
import NewGame from '../../src/components/new-game';
import Scoring from '../../src/components/in-game/scoring';
import Settings from '../../src/components/settings/settings';
import {
	config,
	gameInProgressTabs,
	screens
} from '../../src/navigation/app';

describe('Given <AppNavigator />', () => {
	describe('and the screens', () => {
		it('should have a `home` screen', () => {
			const expectedScreen = {
				screen: HomePage
			};

			expect(screens.HOME).toEqual(expectedScreen);
		});

		it('should have a `history` screen', () => {
			const expectedScreen = {
				screen: History
			};

			expect(screens.HISTORY).toEqual(expectedScreen);
		});

		it('should have a `history detail` screen', () => {
			const expectedScreen = {
				screen: HistoryDetail
			};

			expect(screens.HISTORY_DETAIL).toEqual(expectedScreen);
		});

		it('should have a `settings` screen', () => {
			const expectedScreen = {
				screen: Settings
			};

			expect(screens.SETTINGS).toEqual(expectedScreen);
		});

		it('should have a `new game` screen', () => {
			const expectedScreen = {
				screen: NewGame
			};

			expect(screens.NEW_GAME).toEqual(expectedScreen);
		});

		it('should have a `game config` screen', () => {
			const expectedScreen = {
				screen: NewGame
			};

			expect(screens.GAME_CONFIG).toEqual(expectedScreen);
		});

		describe('and the `game in progress` screens', () => {
			it('should have a `game info` screen', () => {
				const expectedScreen = {
					screen: GameInfo
				};

				expect(gameInProgressTabs.gameInfo).toEqual(expectedScreen);
			});

			it('should have a `scoring` screen', () => {
				const expectedScreen = {
					screen: Scoring
				};

				expect(gameInProgressTabs.scoring).toEqual(expectedScreen);
			});
		});
	});

	describe('and the config', () => {
		it('should have the correct `initialRouteName`', () => {
			expect(config.initialRouteName).toEqual('HOME');
		});

		describe('and the navigation options', () => {
			const options = config.navigationOptions;

			it('should have the correct `headerBackTitle`', () => {
				expect(options.headerBackTitle).toEqual('Back');
			});

			it('should have the correct `headerTintColor`', () => {
				expect(options.headerTintColor).toEqual('#fff');
			});

			it('should have the correct `headerStyle`', () => {
				const expectedHeaderStyle = {
					backgroundColor: '#2089dc'
				};

				expect(options.headerStyle).toEqual(expectedHeaderStyle);
			});
		});
	});
});
