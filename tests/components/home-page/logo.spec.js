import React from 'react';
import { shallow } from 'enzyme';
import { View } from 'react-native';

import Logo from '../../../src/components/home-page/logo';
import logoStyles from '../../../src/components/home-page/styles/logo';

describe('Given <Logo />', () => {
	const renderedComponent = shallow(<Logo />);

	it('should be a `View`', () => {
		expect(renderedComponent.is(View)).toBe(true);
	});

	it('should have the `container` styles', () => {
		expect(renderedComponent.prop('style')).toEqual(logoStyles.container);
	});

	describe('and its first child', () => {
		const logoText = renderedComponent.childAt(0);

		it('should be `Text`', () => {
			expect(logoText.is('TextElement')).toBe(true);
		});

		it('should have a `h1` prop', () => {
			expect(logoText.prop('h1')).toBe(true);
		});

		it('should have the correct text', () => {
			const text = logoText.props().children;

			expect(text).toEqual('Yarni!');
		});
	});
});
