import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import SetupProgress from '../../../../src/components/new-game/game-setup/setup-progress';
import setupProgressStyles from '../../../../src/components/new-game/game-setup/styles/setup-progress';

describe('Given <SetupProgress />', () => {
	const sandbox = sinon.sandbox.create();
	const onPress = sandbox.stub();
	const props = {
		onPress
	};
	const renderedComponent = shallow(<SetupProgress { ...props } />);

	beforeEach(() => sandbox.reset());

	afterEach(() => {
		sandbox.restore();
		onPress.reset();
	});

	it('should be a `Button`', () => {
		expect(renderedComponent.is('Button')).toBe(true);
	});

	it('should have the `container` styles', () => {
		expect(renderedComponent.prop('containerViewStyle')).toEqual(setupProgressStyles.container);
	});

	it('should have a `disabled/true` prop', () => {
		expect(renderedComponent.prop('disabled')).toBe(true);
	});

	it('should have the correct `disabledTextStyle` prop', () => {
		expect(renderedComponent.prop('disabledTextStyle')).toEqual(setupProgressStyles.disabled);
	});

	describe('when NOT complete', () => {
		it('should have the correct text', () => {
			const textValue = renderedComponent.prop('title');

			expect(textValue).toEqual('NEXT');
		});
	});

	describe('when complete', () => {
		const newProps = {
			...props,
			complete: true
		};
		const renderedComponent = shallow(<SetupProgress { ...newProps } />);

		it('should have the correct text', () => {
			const textValue = renderedComponent.prop('title');

			expect(textValue).toEqual('START');
		});
	});

	describe('when active', () => {
		const newProps = {
			...props,
			active: true
		};
		const renderedComponent = shallow(<SetupProgress { ...newProps } />);

		it('should have a `disabled/false` prop', () => {
			expect(renderedComponent.prop('disabled')).toBe(false);
		});
	});

	describe('when pressed', () => {
		it('should trigger the `onPress` prop if active', () => {
			const newProps = {
				...props,
				active: true
			};
			const renderedComponent = shallow(<SetupProgress { ...newProps } />);

			renderedComponent.simulate('press');

			expect(onPress.calledOnce).toBe(true);
		});

		it('should NOT trigger the `onPress` prop if NOT `active`', () => {
			renderedComponent.simulate('press');

			expect(onPress.calledOnce).toBe(false);
		});
	});
});
