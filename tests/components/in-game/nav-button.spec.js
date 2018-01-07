import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import NavButton from '../../../src/components/in-game/nav-button';

import navButtonStyles from '../../../src/components/in-game/styles/nav-button';

describe('Given <NavButton />', () => {
	const onSelect = sinon.stub();
	const text = 'Hello!';
	const props = {
		onSelect,
		text
	};
	const renderedComponent = shallow(<NavButton { ...props } />);

	it('should be a `TouchableOpacity`', () => {
		expect(renderedComponent.is('TouchableOpacity')).toBe(true);
	});

	it('should have an `activeOpacity` prop', () => {
		expect(renderedComponent.prop('activeOpacity')).toEqual(0.8);
	});

	it('should have the `container` styles', () => {
		expect(renderedComponent.prop('style')).toEqual(navButtonStyles.container);
	});

	it('should call the `onSelect` function when pressed', () => {
		renderedComponent.simulate('press');

		expect(onSelect.calledOnce).toBe(true);
	});

	describe('and its first child', () => {
		const textChild = renderedComponent.childAt(0);

		it('should be a `Text`', () => {
			expect(textChild.is('Text')).toBe(true);
		});

		it('should have the `text` styles', () => {
			expect(textChild.prop('style')).toEqual(navButtonStyles.text);
		});

		it('should have the correct value', () => {
			expect(textChild.props().children).toEqual(text);
		});
	});
});
