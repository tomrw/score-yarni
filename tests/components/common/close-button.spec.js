import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import CloseButton from '../../../src/components/common/close-button';
import closeButtonStyles from '../../../src/components/common/styles/close-button';

describe('Given <CloseButton />', () => {
	const onClose = sinon.spy();
	const optionalStyles = {
		position: 'absolute'
	};
	const props = {
		onClose,
		style: optionalStyles
	};
	const renderedComponent = shallow(<CloseButton { ...props } />);

	it('should be a `TouchableOpacity`', () => {
		expect(renderedComponent.is('TouchableOpacity')).toBe(true);
	});

	it('should have an `activeOpacity` prop', () => {
		expect(renderedComponent.prop('activeOpacity')).toEqual(0.8);
	});

	it('should have the `close-button` styles', () => {
		const style = renderedComponent.prop('style');

		expect(style).toContain(closeButtonStyles.container);
	});

	it('should use the supplied styles', () => {
		const styles = renderedComponent.prop('style');

		expect(styles).toContain(optionalStyles);
	});

	it('should call the `onClose` prop when pressed', () => {
		renderedComponent.simulate('press');

		expect(onClose.calledOnce).toBe(true);
	});

	it('should have two children', () => {
		expect(renderedComponent.children().length).toEqual(2);
	});

	describe('and its first child', () => {
		const arrow = renderedComponent.childAt(0);

		it('should have the `arrow` styles', () => {
			expect(arrow.prop('style')).toContain(closeButtonStyles.arrow);
		});

		it('should have the `first` styles', () => {
			expect(arrow.prop('style')).toContain(closeButtonStyles.first);
		});

		it('should NOT have the `second` styles', () => {
			expect(arrow.prop('style')).not.toContain(closeButtonStyles.second);
		});
	});

	describe('and its second child', () => {
		const arrow = renderedComponent.childAt(1);

		it('should have the `arrow` styles', () => {
			expect(arrow.prop('style')).toContain(closeButtonStyles.arrow);
		});

		it('should have the `second` styles', () => {
			expect(arrow.prop('style')).toContain(closeButtonStyles.second);
		});

		it('should NOT have the `first` styles', () => {
			expect(arrow.prop('style')).not.toContain(closeButtonStyles.first);
		});
	});
});
