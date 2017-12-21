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

		expect(styles).toContain(backButtonStyles);
	});

	it('should use the supplied styles', () => {
		const styles = renderedComponent.prop('style');

		expect(styles).toContain(optionalStyles);
	});

	it('should call the `onBack` prop when pressed', () => {
		renderedComponent.simulate('press');

		expect(onBack.calledOnce).toBe(true);
	});
});
