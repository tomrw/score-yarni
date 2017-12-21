import React from 'react';
import { shallow } from 'enzyme';

import Logo from '../../../src/components/home-page/logo';
import logoStyle from '../../../src/components/home-page/styles/logo';

describe('Given <Logo />', () => {
	const renderedComponent = shallow(<Logo />);

	it('should be a `Text`', () => {
		expect(renderedComponent.is('Text')).toBe(true);
	});

	it('should have the `logo` styles', () => {
		const style = renderedComponent.prop('style');

		expect(style).toEqual(logoStyle);
	});

	it('should have the correct text', () => {
		const text = renderedComponent.first().props().children;

		expect(text).toEqual('Hola!');
	});
});
