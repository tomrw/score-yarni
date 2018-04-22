import React from 'react';
import sinon from 'sinon';
import { Button } from 'react-native-elements';
import { shallow } from 'enzyme';

import IconButton from '../../../src/components/common/icon-button';

describe('Given <IconButton />', () => {
	const onPress = sinon.stub();
	const name = 'delete';
	const renderedComponent = shallow(<IconButton name={ name }onPress={ onPress } />);

	it('should be a `Button`', () => {
		expect(renderedComponent.is(Button)).toBe(true);
	});

	it('should have the correct `borderRadius` prop', () => {
		const expectedBorderRadius = 20;

		expect(renderedComponent.prop('borderRadius')).toEqual(expectedBorderRadius);
	});

	it('should have the correct `icon` prop', () => {
		const expectedIcon = {
			name,
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

	it('should call the `onPress` prop when pressed', () => {
		renderedComponent.simulate('press');

		expect(onPress.calledOnce).toBe(true);
	});
});
