import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import BackButton from '../../../src/components/common/back-button';
import backButtonStyles from '../../../src/components/common/styles/back-button';

describe('Given <BackButton />', () => {
	const onBack = sinon.stub();
	const optionalStyles = {
		position: 'absolute'
	};
	const props = {
		onBack,
		style: optionalStyles
	};
	const renderedComponent = shallow(<BackButton { ...props } />);

	it('should be a `TouchableOpacity`', () => {
		expect(renderedComponent.is('TouchableOpacity')).toBe(true);
	});

	it('should have the `back-button` styles', () => {
		const styles = renderedComponent.prop('style');

		expect(styles).toContain(backButtonStyles.container);
	});

	it('should have an `activeOpacity` prop', () => {
		expect(renderedComponent.prop('activeOpacity')).toEqual(0.8);
	});

	it('should use the supplied styles', () => {
		const styles = renderedComponent.prop('style');

		expect(styles).toContain(optionalStyles);
	});

	it('should call the `onBack` prop when pressed', () => {
		renderedComponent.simulate('press');

		expect(onBack.calledOnce).toBe(true);
	});

	it('should have three children', () => {
		expect(renderedComponent.children()).toHaveLength(3);
	});

	it('should have all `View` children', () => {
		expect(renderedComponent.find('View')).toHaveLength(3);
	});

	describe('and its first child', () => {
		const arrow = renderedComponent.childAt(0);

		it('should have the `arrow` style', () => {
			expect(arrow.prop('style')).toContain(backButtonStyles.arrow);
		});

		it('should have the `first` style', () => {
			expect(arrow.prop('style')).toContain(backButtonStyles.first);
		});

		it('should NOT have the `second` style', () => {
			expect(arrow.prop('style')).not.toContain(backButtonStyles.second);
		});

		it('should NOT have the `line` style', () => {
			expect(arrow.prop('style')).not.toContain(backButtonStyles.line);
		});
	});

	describe('and its second child', () => {
		const arrow = renderedComponent.childAt(1);

		it('should have the `arrow` style', () => {
			expect(arrow.prop('style')).toContain(backButtonStyles.arrow);
		});

		it('should have the `second` style', () => {
			expect(arrow.prop('style')).toContain(backButtonStyles.second);
		});

		it('should NOT have the `first` style', () => {
			expect(arrow.prop('style')).not.toContain(backButtonStyles.first);
		});

		it('should NOT have the `line` style', () => {
			expect(arrow.prop('style')).not.toContain(backButtonStyles.line);
		});
	});

	describe('and its third child', () => {
		const line = renderedComponent.childAt(2);

		it('should have ONLY the `line` style', () => {
			expect(line.prop('style')).toEqual(backButtonStyles.line);
		});
	});
});
