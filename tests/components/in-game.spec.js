import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import CloseButton from '../../src/components/common/close-button';
import Header from '../../src/components/common/header';
import NavigationBar from '../../src/components/in-game/navigation-bar';
import { InGame } from '../../src/components/in-game';

import inGameStyles from '../../src/components/styles/in-game';

describe('Given <InGame />', () => {
	const navigateTo = sinon.stub();
	const players = [];
	const resetGame = sinon.stub();
	const scores = [];
	const props = {
		navigateTo,
		players,
		resetGame,
		scores
	};
	const renderedComponent = shallow(<InGame { ...props } />);

	it('should be a `View`', () => {
		expect(renderedComponent.is('View')).toBe(true);
	});

	it('should have the `container` styles', () => {
		expect(renderedComponent.prop('style')).toEqual(inGameStyles.container);
	});

	describe('and its first child', () => {
		const header = renderedComponent.childAt(0);

		it('should be a `Header`', () => {
			expect(header.is(Header)).toBe(true);
		});

		it('should have a `text` prop', () => {
			expect(header.prop('text')).not.toEqual('');
		});
	});

	describe('and its second child', () => {
		const closeButton = renderedComponent.childAt(1);

		it('should be a `CloseButton`', () => {
			expect(closeButton.is(CloseButton)).toBe(true);
		});

		it('should have the `closeButton` styles', () => {
			expect(closeButton.prop('style')).toEqual(inGameStyles.closeButton);
		});

		describe('when the `onClose` prop is triggered', () => {
			const onClose = closeButton.prop('onClose');

			onClose();

			it('should call `navigateTo` when the `onClose` prop is triggered', () => {
				expect(navigateTo.withArgs('HOME').calledOnce).toBe(true);
			});

			it('should call `resetGame`', () => {
				expect(resetGame.calledOnce).toBe(true);
			});
		});
	});

	describe('and its fourth child', () => {
		const navBar = renderedComponent.childAt(3);

		it('should be a `navigationBar`', () => {
			expect(navBar.is(NavigationBar)).toBe(true);
		});

		it('should have the `navigationBar` styles', () => {
			expect(navBar.prop('style')).toEqual(inGameStyles.navigationBar);
		});
	});
});
