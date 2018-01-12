import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import NavigationBar from '../../../src/components/in-game/navigation-bar';
import NavButton from '../../../src/components/in-game/nav-button';

import navigationBarStyles from '../../../src/components/in-game/styles/navigation-bar';

describe('Given <NavigationBar />', () => {
	const navigateTo = sinon.stub();
	const optionalStyles = {
		position: 'absolute'
	};
	const props = {
		navigateTo,
		style: optionalStyles
	};
	const renderedComponent = shallow(<NavigationBar { ...props } />);

	afterEach(() => navigateTo.reset());

	it('should be a `View`', () => {
		expect(renderedComponent.is('View')).toBe(true);
	});

	it('should have the `container` styles', () => {
		expect(renderedComponent.prop('style')).toContain(navigationBarStyles.container);
	});

	it('should use the supplied styles', () => {
		expect(renderedComponent.prop('style')).toContain(optionalStyles);
	});

	it('should have two children', () => {
		expect(renderedComponent.children()).toHaveLength(2);
	});

	describe('and its first child', () => {
		const leaderboardButton = renderedComponent.childAt(0);

		it('should be a `NavButton`', () => {
			expect(leaderboardButton.is(NavButton)).toBe(true);
		});

		it('should have the correct text', () => {
			const expectedText = 'Leaderboard';

			expect(leaderboardButton.prop('text')).toEqual(expectedText);
		});

		it('should have an `active/true` prop', () => {
			expect(leaderboardButton.prop('active')).toBe(true);
		});

		it('should call the `onNavigate` prop when its `onSelect` prop is called', () => {
			const onSelect = leaderboardButton.prop('onSelect');

			onSelect();

			expect(navigateTo.withArgs('GAME_IN_PROGRESS', 'leaderboard').calledOnce).toBe(true);
		});
	});

	describe('and its second child', () => {
		const addScoresButton = renderedComponent.childAt(1);

		it('should be a `NavButton`', () => {
			expect(addScoresButton.is(NavButton)).toBe(true);
		});

		it('should have the correct text', () => {
			const expectedText = 'Add Scores';

			expect(addScoresButton.prop('text')).toEqual(expectedText);
		});

		it('should NOT have an `active` prop', () => {
			expect(addScoresButton.prop('active')).toBeFalsy();
		});

		it('should call the `onNavigate` prop when its `onSelect` prop is called', () => {
			const onSelect = addScoresButton.prop('onSelect');

			onSelect();

			expect(navigateTo.withArgs('GAME_IN_PROGRESS', 'addScores').calledOnce).toBe(true);
		});
	});

});
