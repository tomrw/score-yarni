import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import CloseButton from '../../../src/components/common/close-button';

describe('Given <CloseButton />', () => {
	const onClose = sinon.stub();
	const renderedComponent = shallow(<CloseButton onClose={ onClose } />);

	it('should be an `Icon`', () => {
		expect(renderedComponent.is('Icon')).toBe(true);
	});

	it('should have the correct `name` prop', () => {
		const expectedName = 'close';

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

	it('should call the `onClose` prop when pressed', () => {
		renderedComponent.simulate('press');

		expect(onClose.calledOnce).toBe(true);
	});
});
