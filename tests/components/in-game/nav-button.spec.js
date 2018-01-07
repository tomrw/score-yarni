import React from 'react';
import { shallow } from 'enzyme';

import NavButton from '../../../src/components/in-game/nav-button';

import navButtonStyles from '../../../src/components/in-game/styles/nav-button';

describe('Given <NavButton />', () => {
	const text = 'Hello!';
	const props = {
		text
	};
	const renderedComponent = shallow(<NavButton { ...props } />);

	it('should be a `View`', () => {
		expect(renderedComponent.is('View')).toBe(true);
	});

	it('should have the `container` styles', () => {
		expect(renderedComponent.prop('style')).toEqual(navButtonStyles.container);
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
