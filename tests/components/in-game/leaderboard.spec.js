import React from 'react';
import { shallow } from 'enzyme';

import Leaderboard from '../../../src/components/in-game/leaderboard';
import leaderboardStyles from '../../../src/components/in-game/styles/leaderboard';

describe('Given <Leaderboard />', () => {
	const data = [
		{ position: 1, name: 'Tom', score: 12 },
		{ position: 2, name: 'Chloe', score: 13 },
		{ position: 3, name: 'Fred', score: 20 }
	];
	const renderedComponent = shallow(<Leaderboard data={ data } />);

	it('should be a `List`', () => {
		expect(renderedComponent.is('List')).toBe(true);
	});

	it('should have the `container` styles', () => {
		expect(renderedComponent.prop('containerStyle')).toEqual(leaderboardStyles.container);
	});

	describe('when rendering the entries', () => {
		it('should render the expected number of children', () => {
			expect(renderedComponent.children()).toHaveLength(data.length);
		});

		data.forEach((entry, i) => {
			describe(`for the entry at position ${ entry.position }`, () => {
				const renderedEntry = renderedComponent.childAt(i);

				it('should be a `LeaderboardEntry`', () => {
					expect(renderedEntry.is('LeaderboardEntry')).toBe(true);
				});

				it('should have a `name` prop', () => {
					expect(renderedEntry.prop('name')).toEqual(entry.name);
				});

				it('should have a `position` prop', () => {
					expect(renderedEntry.prop('position')).toEqual(entry.position);
				});

				it('should have a `score` prop', () => {
					expect(renderedEntry.prop('score')).toEqual(entry.score);
				});
			});
		});
	});
});
