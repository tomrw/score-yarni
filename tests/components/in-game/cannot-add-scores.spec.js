import React from 'react';
import { shallow } from 'enzyme';
import { Text, View } from 'react-native';

import CannotAddScores from '../../../src/components/in-game/cannot-add-scores';
import cannotAddScoresStyles from '../../../src/components/in-game/styles/cannot-add-scores';

describe('Given <CannotAddScores />', () => {
	const renderedComponent = shallow(<CannotAddScores />);

	it('should be a `View`', () => {
		expect(renderedComponent.is(View)).toBe(true);
	});

	describe('and its first child', () => {
		const heading = renderedComponent.childAt(0);

		it('should be a `Text`', () => {
			expect(heading.is(Text)).toBe(true);
		});

		it('should have the `heading` styles', () => {
			expect(heading.prop('style')).toEqual(cannotAddScoresStyles.heading);
		});

		it('should have the expected text', () => {
			const expectedText = 'The game has ended';

			expect(heading.props().children).toEqual(expectedText);
		});
	});

	describe('and its second child', () => {
		const body = renderedComponent.childAt(1);

		it('should be a `Text`', () => {
			expect(body.is(Text)).toBe(true);
		});

		it('should have the `body` styles', () => {
			expect(body.prop('style')).toEqual(cannotAddScoresStyles.body);
		});

		it('should have the expected text', () => {
			const expectedText = 'The game has ended so you cannot add any new scores';

			expect(body.props().children).toEqual(expectedText);
		});
	});
});
