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

	it('should be a `Button`', () => {
		expect(renderedComponent.is('Button')).toBe(true);
	});

	it('should have the correct `title` prop', () => {
		expect(renderedComponent.prop('title')).toEqual(text);
	});

	it('should have the `container` styles', () => {
		expect(renderedComponent.prop('containerViewStyle')).toContain(navButtonStyles.container);
	});

	it('should call the `onSelect` function when pressed', () => {
		renderedComponent.simulate('press');

		expect(onSelect.calledOnce).toBe(true);
	});

	describe('when NOT active', () => {
		it('should have a `textStyle/false` prop', () => {
			expect(renderedComponent.prop('buttonStyle')).toBeUndefined();
		});

		it('should have a `textStyle/false` prop', () => {
			expect(renderedComponent.prop('textStyle')).toBeUndefined();
		});
	});

	describe('when active', () => {
		const newProps = {
			...props,
			active: true
		};
		const renderedComponent = shallow(<NavButton { ...newProps } />);

		it('should have a `textStyle/true` prop', () => {
			expect(renderedComponent.prop('buttonStyle')).toEqual(navButtonStyles.active);
		});

		it('should have a `textStyle/true` prop', () => {
			expect(renderedComponent.prop('textStyle')).toEqual(navButtonStyles.activeText);
		});
	});
});
