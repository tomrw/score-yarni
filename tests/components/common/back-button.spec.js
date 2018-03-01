import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import BackButton from '../../../src/components/common/back-button';

describe('Given <BackButton />', () => {
	const onBack = sinon.stub();
	const renderedComponent = shallow(<BackButton onBack={ onBack } />);

	it('should be an `Icon`', () => {
		expect(renderedComponent.is('Icon')).toBe(true);
	});

	it('should have the correct `name` prop', () => {
		const expectedName = 'chevron-left';

		expect(renderedComponent.prop('name')).toEqual(expectedName);
	});

	it('should have the correct `color` prop', () => {
		const expectedColor = '#fff';

		expect(renderedComponent.prop('color')).toEqual(expectedColor);
	});

	it('should have the correct `underlayColor` prop', () => {
		const expectedUnderlayColor = 'rgba(0,0,0,0.5)';

		expect(renderedComponent.prop('underlayColor')).toEqual(expectedUnderlayColor);
	});

	it('should call the `onBack` prop when pressed', () => {
		renderedComponent.simulate('press');

		expect(onBack.calledOnce).toBe(true);
	});
});
