import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import Header from '../../../src/components/common/header';
import { History } from '../../../src/components/history/history';

describe('Given <History />', () => {
	const navigateTo = sinon.stub();
	const props = {
		navigateTo
	};
	const renderedComponent = shallow(<History { ...props } />);

	it('should be a `View`', () => {
		expect(renderedComponent.is('View')).toBe(true);
	});

	describe('and its first child', () => {
		const header = renderedComponent.childAt(0);

		it('should be a `Header`', () => {
			expect(header.is(Header)).toBe(true);
		});

		it('should have a `text` prop', () => {
			const expectedText = 'Past Games';

			expect(header.prop('text')).toEqual(expectedText);
		});

		describe('when the `onClose` prop is called', () => {
			const onClose = header.prop('onClose');

			onClose();

			it('should call `navigateTo` when the `onClose` prop is triggered', () => {
				expect(navigateTo.withArgs('HOME').calledOnce).toBe(true);
			});
		});
	});
});
