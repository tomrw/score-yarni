import React from 'react';
import { shallow } from 'enzyme';
import { Text, View } from 'react-native';

import GameEndedSummary from '../../../src/components/in-game/game-ended-summary';

import gameEndedSummaryStyles from '../../../src/components/in-game/styles/game-ended-summary';

describe('Given <GameEndedSummary />', () => {
	const renderedComponent = shallow(<GameEndedSummary />);

	it('should be a `View`', () => {
		expect(renderedComponent.is(View)).toBe(true);
	});

	it('should have the `container` styles', () => {
		expect(renderedComponent.prop('style')).toEqual(gameEndedSummaryStyles.container);
	});

	describe('and its first child', () => {
		const text = renderedComponent.childAt(0);

		it('should be a `Text`', () => {
			expect(text.is(Text)).toBe(true);
		});

		it('should have the `text` styles', () => {
			expect(text.prop('style')).toEqual(gameEndedSummaryStyles.text);
		});

		it('should have the expected text', () => {
			const expectedText = 'This game has ended!';

			expect(text.props().children).toEqual(expectedText);
		});
	});
});
