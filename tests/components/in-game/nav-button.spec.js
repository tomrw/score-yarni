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
		expect(renderedComponent.prop('style')).toContain(navButtonStyles.container);
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
			expect(textChild.prop('style')).toContain(navButtonStyles.text);
		});

		it('should have the correct value', () => {
			expect(textChild.props().children).toEqual(text);
		});
	});

	describe('when active', () => {
		const newProps = {
			...props,
			active: true
		};
		const renderedComponent = shallow(<NavButton { ...newProps } />);
		const textChild = renderedComponent.childAt(0);

		it('should have the `active` styles', () => {
			expect(renderedComponent.prop('style')).toContain(navButtonStyles.active);
		});

		it('should have the `textActive` styles', () => {
			expect(textChild.prop('style')).toContain(navButtonStyles.activeText);
		});
	});
});
