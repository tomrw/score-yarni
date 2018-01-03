import React from 'react';
import { shallow } from 'enzyme';

import NewGame from '../../src/components/new-game';
import HomePage from '../../src/components/home-page';
import { App } from '../../src/components/app';

import appStyles from '../../src/components/styles/app';

describe('Given <App />', () => {
	const renderedComponent = shallow(<App />);

	it('should be a `View`', () => {
		expect(renderedComponent.is('View')).toBe(true);
	});

	it('should have the `app` styles', () => {
		expect(renderedComponent.prop('style')).toEqual(appStyles);
	});

	it('should render the <HomePage />', () => {
		expect(renderedComponent.find(HomePage).exists()).toBe(true);
	});

	it('should only render one child', () => {
		expect(renderedComponent.children).toHaveLength(1);
	});

	describe('when rendered with the `NEW_GAME` view', () => {
		const props = {
			view: 'NEW_GAME'
		};
		const renderedComponent = shallow(<App { ...props } />);

		it('should render the <NewGame />', () => {
			expect(renderedComponent.find(NewGame).exists()).toBe(true);
		});

		it('should only render one child', () => {
			expect(renderedComponent.children).toHaveLength(1);
		});
	});

	describe('when rendered with the `GAME_CONFIG` view', () => {
		const props = {
			view: 'GAME_CONFIG'
		};
		const renderedComponent = shallow(<App { ...props } />);

		it('should render the <NewGame />', () => {
			expect(renderedComponent.find(NewGame).exists()).toBe(true);
		});

		it('should only render one child', () => {
			expect(renderedComponent.children).toHaveLength(1);
		});
	});
});
