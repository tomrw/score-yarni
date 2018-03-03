import React from 'react';
import { shallow } from 'enzyme';

import Scoreboard from '../../../src/components/in-game/scoreboard';

import scoreboardStyles from '../../../src/components/in-game/styles/scoreboard';

describe('Given <Scoreboard />', () => {
	const scores1 = [ 1, 2, 3 ];
	const scores2 = [ 4, 5, 6 ];
	const scoreboardData = [
		{ name: 'Tom', scores: scores1 },
		{ name: 'Fred', scores: scores2 }
	];
	const renderedComponent = shallow(<Scoreboard scoreboardData={ scoreboardData } />);

	it('should be a `View`', () => {
		expect(renderedComponent.is('View')).toBe(true);
	});

	it('should have the `container` styles', () => {
		expect(renderedComponent.prop('style')).toEqual(scoreboardStyles.container);
	});

	it('should have the expected number of children', () => {
		expect(renderedComponent.children()).toHaveLength(scoreboardData.length);
	});

	scoreboardData.forEach(({ name, scores }, i) => {
		describe(`when rendering the score for ${ name }`, () => {
			const entry = renderedComponent.childAt(i);

			it('should be a `ScoreboardEntry`', () => {
				expect(entry.is('ScoreboardEntry')).toBe(true);
			});

			it('should have the correct `key`', () => {
				const expectedKey = i.toString();

				expect(entry.key()).toEqual(expectedKey);
			});

			it('should have the correct `name` prop', () => {
				expect(entry.prop('name')).toEqual(name);
			});

			it('should have the correct `scores` prop', () => {
				expect(entry.prop('scores')).toEqual(scores);
			});
		});
	});
});
