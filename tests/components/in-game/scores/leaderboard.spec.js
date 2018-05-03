import React from 'react';
import { shallow } from 'enzyme';

import Leaderboard from '../../../../src/components/in-game/scores/leaderboard';
import LeaderboardEntry from '../../../../src/components/in-game/scores/leaderboard-entry';
import leaderboardStyles from '../../../../src/components/in-game/scores/styles/leaderboard';

describe('Given <Leaderboard />', () => {
	const leaderboardData = [
		{ position: 1, scores: [ { name: 'Tom', score: 12 } ] },
		{ position: 2, scores: [
			{ name: 'Chloe', score: 13 },
			{ name: 'Jimmy', score: 13 }
		] },
		{ position: 3, scores: [ { name: 'Fred', score: 20 } ] }
	];
	const renderedComponent = shallow(<Leaderboard leaderboardData={ leaderboardData } />);

	it('should be a `List`', () => {
		expect(renderedComponent.is('List')).toBe(true);
	});

	it('should have the `container` styles', () => {
		expect(renderedComponent.prop('containerStyle')).toEqual(leaderboardStyles.container);
	});

	describe('when rendering the entries', () => {
		const leaderboard = leaderboardData.reduce((itemList, { position, scores }) => {
			const flattedScores = scores.map(({ name, score }) => ({
				name,
				position,
				score
			}));

			return itemList.concat(flattedScores);
		}, []);

		it('should render the expected number of children', () => {
			expect(renderedComponent.children()).toHaveLength(leaderboard.length);
		});

		it('should have the expected number of <LeaderboardEntry />', () => {
			expect(renderedComponent.find(LeaderboardEntry)).toHaveLength(leaderboard.length);
		});

		leaderboard.forEach((entry, i) => {
			describe(`for the entry at index ${ i }`, () => {
				const renderedEntry = renderedComponent.childAt(i);

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
