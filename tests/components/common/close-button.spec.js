import React from 'react';
import sinon from 'sinon';
import { Button } from 'react-native-elements';
import { shallow } from 'enzyme';

import CloseButton from '../../../src/components/common/close-button';

describe('Given <CloseButton />', () => {
	const onClose = sinon.stub();
	const renderedComponent = shallow(<CloseButton onClose={ onClose } />);

	it('should be a `Button`', () => {
		expect(renderedComponent.is(Button)).toBe(true);
	});

	it('should have the correct `borderRadius` prop', () => {
		const expectedBorderRadius = 20;

		expect(renderedComponent.prop('borderRadius')).toEqual(expectedBorderRadius);
	});

	it('should have the correct `icon` prop', () => {
		const expectedIcon = {
			name: 'close',
			size: 25
		};

		expect(renderedComponent.prop('icon')).toEqual(expectedIcon);
	});

	it('should have the correct `buttonStyle` prop', () => {
		const expectedStyle = {
			marginRight: 0,
			paddingRight: 0
		};

		expect(renderedComponent.prop('buttonStyle')).toEqual(expectedStyle);
	});

	it('should have the correct `containerViewStyle` prop', () => {
		const expectedStyle = {
			marginRight: 0,
			paddingRight: 0
		};

		expect(renderedComponent.prop('containerViewStyle')).toEqual(expectedStyle);
	});

	it('should have a `transparent/true` prop', () => {
		expect(renderedComponent.prop('transparent')).toBe(true);
	});

	it('should call the `onClose` prop when pressed', () => {
		renderedComponent.simulate('press');

		expect(onClose.calledOnce).toBe(true);
	});
});
