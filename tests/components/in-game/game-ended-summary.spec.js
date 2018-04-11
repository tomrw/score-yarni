import React from 'react';
import { shallow } from 'enzyme';
import { Text, View } from 'react-native';

import GameEndedSummary from '../../../src/components/in-game/game-ended-summary';

import gameEndedSummaryStyles from '../../../src/components/in-game/styles/game-ended-summary';

describe('Given <GameEndedSummary />', () => {
	const winners = [ 'Tom' ];
	const renderedComponent = shallow(<GameEndedSummary winners={ winners } />);

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
	});

	describe('when there is only ONE winner', () => {
		const winners = [ 'Tom' ];
		const renderedComponent = shallow(<GameEndedSummary winners={ winners } />);
		const text = renderedComponent.childAt(0);
		const textContent = text.props().children;

		it('should read correctly', () => {
			const expectedText = 'Tom wins!';

			expect(textContent).toEqual(expectedText);
		});
	});

	describe('when there are TWO winners', () => {
		const winners = [ 'Tom', 'Fred' ];
		const renderedComponent = shallow(<GameEndedSummary winners={ winners } />);
		const text = renderedComponent.childAt(0);
		const textContent = text.props().children;

		it('should read correctly', () => {
			const expectedText = 'Tom & Fred win!';

			expect(textContent).toEqual(expectedText);
		});
	});

	describe('when there are more than TWO winners', () => {
		const winners = [ 'Tom', 'Fred', 'Chloe' ];
		const renderedComponent = shallow(<GameEndedSummary winners={ winners } />);
		const text = renderedComponent.childAt(0);
		const textContent = text.props().children;

		it('should read correctly', () => {
			const expectedText = 'Tom, Fred & Chloe win!';

			expect(textContent).toEqual(expectedText);
		});
	});
});
