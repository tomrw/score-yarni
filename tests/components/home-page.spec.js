import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import GameSelect from '../../src/components/home-page/game-select';
import HomePageButton from '../../src/components/home-page/home-page-button';
import Logo from '../../src/components/home-page/logo';
import { HomePage } from '../../src/components/home-page';

import homePageStyles from '../../src/components/styles/home-page';

describe('Given <HomePage />', () => {
	const currentGame = {
		status: {
			location: 'NEW_GAME'
		},
		players: [
			{ id: 1, name: 'Tom' },
			{ id: 2, name: 'Fred' }
		]
	};
	const moveToAddPlayers = sinon.stub();
	const navigate = sinon.stub();
	const navigation = { navigate };
	const resumeGame = sinon.stub();
	const props = {
		currentGame,
		moveToAddPlayers,
		navigation,
		resumeGame
	};
	const renderedComponent = shallow(<HomePage { ...props } />);

	it('should be a `View`', () => {
		expect(renderedComponent.is('View')).toBe(true);
	});

	it('should have the `container` styles', () => {
		expect(renderedComponent.prop('style')).toEqual(homePageStyles.container);
	});

	describe('and its navigation options', () => {
		const options = HomePage.navigationOptions;

		it('should have no `header`', () => {
			expect(options.header).toBeNull();
		});
	});

	describe('and its first child', () => {
		const wrapperChild = renderedComponent.childAt(0);

		it('should be a `View`', () => {
			expect(wrapperChild.is('View')).toBe(true);
		});

		it('should have the `home-page-content-wrapper` styles', () => {
			expect(wrapperChild.prop('style')).toEqual(homePageStyles.contentWrapper);
		});
	});

	describe('and the content wrapper', () => {
		const wrapperChild = renderedComponent.childAt(0);

		describe('and its first child', () => {
			const logo = wrapperChild.childAt(0);

			it('should be a `Logo`', () => {
				expect(logo.is(Logo)).toBe(true);
			});
		});

		describe('and its second child', () => {
			const gameSelect = wrapperChild.childAt(1);

			it('should be a <GameSelect />', () => {
				expect(gameSelect.is(GameSelect)).toBe(true);
			});

			it('should have a `currentGame` prop', () => {
				expect(gameSelect.prop('currentGame')).toEqual(currentGame);
			});

			it('should have a `resumeGame` prop', () => {
				expect(gameSelect.prop('resumeGame')).toEqual(resumeGame);
			});

			it('should have an `onNewGame` prop', () => {
				expect(gameSelect.prop('onNewGame')).toEqual(moveToAddPlayers);
			});
		});

		describe('and its third child', () => {
			const settingsButton = wrapperChild.childAt(2);

			it('should be a <HomePageButton />', () => {
				expect(settingsButton.is(HomePageButton)).toBe(true);
			});

			describe('when the `onPress` prop is called', () => {
				it('should call its `navigate` prop with `SETTINGS`', () => {
					const onPress = settingsButton.prop('onPress');

					onPress();

					expect(navigate.withArgs('SETTINGS').calledOnce).toBe(true);
				});
			});
		});

		describe('and its fourth child', () => {
			const historyButton = wrapperChild.childAt(3);

			it('should be a <HomePageButton />', () => {
				expect(historyButton.is(HomePageButton)).toBe(true);
			});

			describe('when the `onPress` prop is called', () => {
				it('should call its `navigate` prop with `HISTORY`', () => {
					const onPress = historyButton.prop('onPress');

					onPress();

					expect(navigate.withArgs('HISTORY').calledOnce).toBe(true);
				});
			});
		});
	});
});
