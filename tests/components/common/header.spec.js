import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import Header from '../../../src/components/common/header';
import BackButton from '../../../src/components/common/back-button';
import CloseButton from '../../../src/components/common/close-button';

import headerStyles from '../../../src/components/common/styles/header';

describe('Given <Header />', () => {
	const onBack = sinon.stub();
	const onClose = sinon.stub();
	const text = 'hello!';
	const props = {
		onBack,
		onClose,
		text
	};
	const renderedComponent = shallow(<Header { ...props } />);

	it('should be a `Header`', () => {
		expect(renderedComponent.is('Header')).toBe(true);
	});

	it('should have a `statusBarProps` prop', () => {
		const expectedProps = {
			backgroundColor: '#476DC5',
			translucent: true
		};

		expect(renderedComponent.prop('statusBarProps')).toEqual(expectedProps);
	});

	describe('and the center component', () => {
		const centerComponent = renderedComponent.prop('centerComponent');

		it('should have the correct `text`', () => {
			expect(centerComponent.text).toEqual(text);
		});

		it('should have the `header` styles', () => {
			expect(centerComponent.style).toEqual(headerStyles.heading);
		});
	});

	describe('and the left component', () => {
		const leftComponent = renderedComponent.prop('leftComponent');

		it('should be a `<BackBtton />`', () => {
			const expectedBackButton = <BackButton onBack={ onBack } />;

			expect(leftComponent).toEqual(expectedBackButton);
		});

		describe('when no `onBack` prop is passed', () => {
			const renderedComponent = shallow(<Header text={ text } />);
			const leftComponent = renderedComponent.prop('leftComponent');

			it('should NOT be rendered', () => {
				expect(leftComponent).toBeUndefined();
			});
		});
	});

	describe('and the right component', () => {
		const rightComponent = renderedComponent.prop('rightComponent');

		it('should be a `<CloseButton />`', () => {
			const expectedCloseButton = <CloseButton onClose={ onClose } />;

			expect(rightComponent).toEqual(expectedCloseButton);
		});

		describe('when no `onClose` prop is passed', () => {
			const renderedComponent = shallow(<Header text={ text } />);
			const rightComponent = renderedComponent.prop('rightComponent');

			it('should NOT be rendered', () => {
				expect(rightComponent).toBeUndefined();
			});
		});
	});
});
