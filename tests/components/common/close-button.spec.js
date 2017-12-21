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

	it('should have the `close-button` styles', () => {
		const style = renderedComponent.prop('style');

		expect(style).toContain(closeButtonStyles);
	});

	it('should use the supplied styles', () => {
		const styles = renderedComponent.prop('style');

		expect(styles).toContain(optionalStyles);
	});

	it('should call the `onClose` prop when pressed', () => {
		renderedComponent.simulate('press');

		expect(onClose.calledOnce).toBe(true);
	});
});
