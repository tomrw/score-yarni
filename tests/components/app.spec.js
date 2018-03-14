import React from 'react';
import sinon from 'sinon';
import { BackHandler } from 'react-native';
import { shallow } from 'enzyme';
import { addNavigationHelpers, NavigationActions } from 'react-navigation';

import AppNavigator from '../../src/navigation/app';
import { addListener } from '../../src/navigation/redux';
import { AppWithNavigationState as App } from '../../src/components/app';

describe('Given <App />', () => {
	const dispatch = sinon.stub();
	const nav = {
		index: 1
	};
	const props = {
		dispatch,
		nav
	};
	const renderedComponent = shallow(<App { ...props } />);
	const sandbox = sinon.sandbox.create();

	afterEach(() => sandbox.restore());

	it('should be a `AppNavigator`', () => {
		expect(renderedComponent.is(AppNavigator)).toBe(true);
	});

	describe('and its `navigation` prop', () => {
		const navigation = renderedComponent.prop('navigation');
		const expectedNavigation = addNavigationHelpers({
			dispatch,
			state: nav,
			addListener
		});

		it('should have an `addListener` prop', () => {
			expect(navigation.addListener).toEqual(expectedNavigation.addListener);
		});

		it('should have a `dispatch` prop', () => {
			expect(navigation.dispatch).toEqual(expectedNavigation.dispatch);
		});

		it('should have a `state` prop', () => {
			expect(navigation.state).toEqual(expectedNavigation.state);
		});
	});

	describe('when the component mounts', () => {
		it('should START listening when the component mounts', () => {
			const spy = sandbox.spy(BackHandler, 'addEventListener');
			const onBack = renderedComponent.instance().onBackPress;

			renderedComponent.instance().componentDidMount();

			expect(spy.withArgs('hardwareBackPress', onBack).calledOnce).toBe(true);
		});
	});

	describe('when the component unmounts', () => {
		it('should STOP listening when the component unmounts', () => {
			const spy = sandbox.spy(BackHandler, 'removeEventListener');
			const onBack = renderedComponent.instance().onBackPress;

			renderedComponent.instance().componentWillUnmount();

			expect(spy.withArgs('hardwareBackPress', onBack).calledOnce).toBe(true);
		});
	});

	describe('when the back button is pressed', () => {
		describe('when the nav index is nil', () => {
			const newProps = {
				...props,
				nav: {
					index: 0
				}
			};
			const renderedComponent = shallow(<App { ...newProps } />);
			const onBack = renderedComponent.instance().onBackPress;

			it('should return `false`', () => {
				expect(onBack()).toBe(false);
			});
		});

		describe('when the nav index is one or greater', () => {
			const onBack = renderedComponent.instance().onBackPress;

			it('should return `true`', () => {
				expect(onBack()).toBe(true);
			});

			it('should dispatch a `NavigationAction/back`', () => {
				const back = NavigationActions.back();

				expect(dispatch.withArgs(back).calledOnce).toBe(true);
			});
		});
	});
});
