import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import Logo from '../../src/components/home-page/logo';
import NewGameButton from '../../src/components/home-page/new-game-button';
import { HomePage } from '../../src/components/home-page';

import homePageStyles from '../../src/components/styles/home-page';

describe('Given <HomePage />', () => {
	const navigateTo = sinon.stub();
	const renderedComponent = shallow(<HomePage navigateTo={ navigateTo } />);

	it('should be a `View`', () => {
		expect(renderedComponent.is('View')).toBe(true);
	});

	it('should have the `container` styles', () => {
		expect(renderedComponent.prop('style')).toEqual(homePageStyles.container);
	});

	describe('and its first child', () => {
		const wrapperChild = renderedComponent.childAt(0);

		it('should be a `View`', () => {
			expect(wrapperChild.is('View')).toBe(true);
		});

		it('should have the `home-page-content-wrapper` styles', () => {
			expect(wrapperChild.prop('style')).toEqual(homePageStyles.contentWrapper);
		});

		it('should contain a <Logo />', () => {
			expect(wrapperChild.find(Logo).exists()).toBe(true);
		});

		it('should contain a <NewGameButton />', () => {
			expect(wrapperChild.find(NewGameButton).exists()).toBe(true);
		});

		it('should have a `navigateTo` prop on the <NewGameButton />', () => {
			expect(typeof wrapperChild.find(NewGameButton).prop('onNewGame')).toBe('function');
		});

		describe('when the `onNewGame` prop is called', () => {
			it('should call its `navigateTo` prop with a `NEW_GAME` arg', () => {
				const onNewGame = wrapperChild.find(NewGameButton).prop('onNewGame');

				onNewGame();

				expect(navigateTo.withArgs('NEW_GAME').calledOnce).toBe(true);
			});
		});
	});
});
