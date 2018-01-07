import React from 'react';
import { shallow } from 'enzyme';

import NavigationBar from '../../../src/components/in-game/navigation-bar';

import navigationBarStyles from '../../../src/components/in-game/styles/navigation-bar';

describe('Given <NavigationBar />', () => {
	const optionalStyles = {
		position: 'absolute'
	};
	const props = {
		style: optionalStyles
	};
	const renderedComponent = shallow(<NavigationBar { ...props } />);

	it('should be a `View`', () => {
		expect(renderedComponent.is('View')).toBe(true);
	});

	it('should have the `container` styles', () => {
		expect(renderedComponent.prop('style')).toContain(navigationBarStyles.container);
	});

	it('should use the supplied styles', () => {
		expect(renderedComponent.prop('style')).toContain(optionalStyles);
	});
});
