import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import HomePageButton from '../../../src/components/home-page/home-page-button';
import homePageButtonStyles from '../../../src/components/home-page/styles/home-page-button';

describe('Given <HomePageButton />', () => {
	const onPress = sinon.spy();
	const text = 'Hello!';
	const props = {
		onPress,
		text
	};
	const renderedComponent = shallow(<HomePageButton { ...props } />);

	it('should be a `Button`', () => {
		expect(renderedComponent.is('Button')).toBe(true);
	});

	it('should have the correct `title` prop', () => {
		expect(renderedComponent.prop('title')).toEqual(text);
	});

	it('should have a `large` prop', () => {
		expect(renderedComponent.prop('large')).toBe(true);
	});

	it('should have a `borderRadius` prop', () => {
		const expectedBorderRadius = 5;

		expect(renderedComponent.prop('borderRadius')).toBe(expectedBorderRadius);
	});

	it('should have the `container` styles', () => {
		expect(renderedComponent.prop('containerViewStyle')).toEqual(homePageButtonStyles.container);
	});

	it('should call the `onPress` prop when clicked', () => {
		renderedComponent.simulate('press');

		expect(onPress.calledOnce).toBe(true);
	});
});
