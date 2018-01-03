import React from 'react';
import { shallow } from 'enzyme';

import Header from '../../../src/components/common/header';
import HeaderStyles from '../../../src/components/common/styles/header';

describe('Given <Header />', () => {
	const text = 'hello!';
	const props = {
		text
	};
	const renderedComponent = shallow(<Header { ...props } />);

	it('should be a `Text`', () => {
		expect(renderedComponent.is('Text')).toBe(true);
	});

	it('should have the `header` styles', () => {
		expect(renderedComponent.prop('style')).toEqual(HeaderStyles);
	});

	it('should render the expected text', () => {
		expect(renderedComponent.props().children).toEqual(text);
	});
});
