import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import SetupProgress from '../../../../src/components/new-game/game-setup/setup-progress';
import setupProgressStyles from '../../../../src/components/new-game/game-setup/styles/setup-progress';

describe('Given <SetupProgress />', () => {
	const sandbox = sinon.sandbox.create();
	const onPress = sandbox.stub();
	const optionalStyles = {
		position: 'absolute'
	};
	const props = {
		onPress,
		style: optionalStyles
	};
	const renderedComponent = shallow(<SetupProgress { ...props } />);

	beforeEach(() => sandbox.reset());

	afterEach(() => {
		sandbox.restore();
		onPress.reset();
	});

	it('should be a `TouchableOpacity`', () => {
		expect(renderedComponent.is('TouchableOpacity')).toBe(true);
	});

	it('should have the `container` styles', () => {
		const styles = renderedComponent.prop('style');

		expect(styles).toContain(setupProgressStyles.container);
	});

	it('should use the supplied styles', () => {
		const styles = renderedComponent.prop('style');

		expect(styles).toContain(optionalStyles);
	});

	describe('and its first child', () => {
		const text = renderedComponent.childAt(0);

		it('should be a `Text`', () => {
			expect(text.is('Text')).toBe(true);
		});

		it('should have the `text` styles', () => {
			const styles = text.prop('style');

			expect(styles).toContain(setupProgressStyles.text);
		});

		it('should NOT have the `active` styles', () => {
			const styles = text.prop('style');

			expect(styles).not.toContain(setupProgressStyles.active);
		});

		describe('when NOT complete', () => {
			it('should have the correct text', () => {
				const textValue = text.first().props().children;

				expect(textValue).toEqual('NEXT');
			});
		});

		describe('when complete', () => {
			const newProps = {
				...props,
				complete: true
			};
			const renderedComponent = shallow(<SetupProgress { ...newProps } />);
			const text = renderedComponent.childAt(0);

			it('should have the correct text', () => {
				const textValue = text.first().props().children;

				expect(textValue).toEqual('START');
			});
		});
	});

	describe('when active', () => {
		const newProps = {
			...props,
			active: true
		};
		const renderedComponent = shallow(<SetupProgress { ...newProps } />);
		const text = renderedComponent.childAt(0);

		it('should have the `active` styles', () => {
			const styles = text.prop('style');

			expect(styles).toContain(setupProgressStyles.active);
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
