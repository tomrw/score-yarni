import React from 'react';
import { shallow } from 'enzyme';
import { View } from 'react-native';

import ProgressBar from '../../../src/components/common/progress-bar';
import progressBarStyles from '../../../src/components/common/styles/progress-bar';

describe('Given <ProgressBar />', () => {
	const props = {
		progress: 5,
		steps: 10
	};
	const renderedComponent = shallow(<ProgressBar { ...props } />);

	it('should be a `View', () => {
		expect(renderedComponent.is(View)).toBe(true);
	});

	it('should have the `container` style', () => {
		expect(renderedComponent.prop('style')).toContain(progressBarStyles.container);
	});

	describe('and its first child', () => {
		const bar = renderedComponent.childAt(0);

		it('should be a `View`', () => {
			expect(bar.is(View)).toBe(true);
		});

		it('should have the `bar` styles', () => {
			expect(bar.prop('style')).toContain(progressBarStyles.bar);
		});

		it('should have the correct width', () => {
			expect(bar.prop('style')).toContainEqual({
				width: '50%'
			});
		});

		it('should NOT have a width below 0', () => {
			const props = {
				progress: 50,
				steps: 10
			};
			const renderedComponent = shallow(<ProgressBar { ...props } />);
			const bar = renderedComponent.childAt(0);

			expect(bar.prop('style')).toContainEqual({
				width: '100%'
			});
		});

		it('should NOT have a width above 0', () => {
			const props = {
				progress: -10,
				steps: 10
			};
			const renderedComponent = shallow(<ProgressBar { ...props } />);
			const bar = renderedComponent.childAt(0);

			expect(bar.prop('style')).toContainEqual({
				width: '0%'
			});
		});

		it('should have a width of `100%` if there are no steps', () => {
			const props = {
				progress: 0,
				steps: 0
			};
			const renderedComponent = shallow(<ProgressBar { ...props } />);
			const bar = renderedComponent.childAt(0);

			expect(bar.prop('style')).toContainEqual({
				width: '100%'
			});
		});
	});
});
