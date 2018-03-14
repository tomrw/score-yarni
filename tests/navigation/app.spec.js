import { screens } from '../../src/navigation/app';
import History from '../../src/components/history/history';
import HomePage from '../../src/components/home-page';
import InGame from '../../src/components/in-game';
import NewGame from '../../src/components/new-game';
import Settings from '../../src/components/settings/settings';

describe('Given <AppNavigator />', () => {
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

	it('should have a `game in progress` screen', () => {
		const expectedScreen = {
			screen: InGame
		};

		expect(screens.GAME_IN_PROGRESS).toEqual(expectedScreen);
	});
});
