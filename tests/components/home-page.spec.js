import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import Logo from '../../src/components/home-page/logo';
import HomePageButton from '../../src/components/home-page/home-page-button';
import { HomePage } from '../../src/components/home-page';

import homePageStyles from '../../src/components/styles/home-page';

describe('Given <HomePage />', () => {
	const navigate = sinon.stub();
	const navigation = { navigate };
	const renderedComponent = shallow(<HomePage navigation={ navigation } />);

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
			const newGameButton = wrapperChild.childAt(1);

			it('should be a <HomePageButton />', () => {
				expect(newGameButton.is(HomePageButton)).toBe(true);
			});

			describe('when the `onPress` prop is called', () => {
				it('should call its `navigate` prop with `NEW_GAME`', () => {
					const onPress = newGameButton.prop('onPress');

					onPress();

					expect(navigate.withArgs('NEW_GAME').calledOnce).toBe(true);
				});
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
