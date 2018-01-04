import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import CloseButton from '../../src/components/common/close-button';
import Header from '../../src/components/common/header';
import { InGame } from '../../src/components/in-game';

describe('Given <InGame />', () => {
	const navigateTo = sinon.stub();
	const props = {
		navigateTo
	};
	const renderedComponent = shallow(<InGame { ...props } />);

	it('should be a `View`', () => {
		expect(renderedComponent.is('View')).toBe(true);
	});

	describe('and its first child', () => {
		const header = renderedComponent.childAt(0);

		it('should be a `Header`', () => {
			expect(header.is(Header)).toBe(true);
		});

		it('should have a `text` prop', () => {
			expect(header.prop('text')).not.toEqual('');
		});
	});

	describe('and its second child', () => {
		const closeButton = renderedComponent.childAt(1);

		it('should be a `CloseButton`', () => {
			expect(closeButton.is(CloseButton)).toBe(true);
		});

		it('should call `navigateTo` when the `onClose` prop is triggered', () => {
			const onClose = closeButton.prop('onClose');

			onClose();

			expect(navigateTo.withArgs('HOME').calledOnce).toBe(true);
		});
	});
});
