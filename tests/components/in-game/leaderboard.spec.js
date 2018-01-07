import React from 'react';
import { shallow } from 'enzyme';

import Leaderboard from '../../../src/components/in-game/leaderboard';
import LeaderboardEntry from '../../../src/components/in-game/leaderboard-entry';

describe('Given <Leaderboard />', () => {
	const data = [
		{ position: 1, name: 'Tom', score: 12 },
		{ position: 2, name: 'Chloe', score: 13 },
		{ position: 3, name: 'Fred', score: 20 }
	];
	const renderedComponent = shallow(<Leaderboard data={ data } />);

	it('should be a `FlatList`', () => {
		expect(renderedComponent.is('FlatList')).toBe(true);
	});

	it('should have a `data` prop', () => {
		expect(renderedComponent.prop('data')).toEqual(data);
	});

	it('should have a `keyExtractor` prop', () => {
		const index = 1234;
		const item = null;
		const keyExtractor = renderedComponent.prop('keyExtractor')(item, index);

		expect(keyExtractor).toEqual(index);
	});

	describe('when rendering a <LeaderboardEntry />', () => {
		const entry1 = data[0];
		const args = {
			item: entry1
		};
		const entry = renderedComponent.prop('renderItem')(args);

		it('should render an entry correctly', () => {
			const expectedEntry = <LeaderboardEntry
				position={ entry1.position }
				name={ entry1.name }
				score={ entry1.score }/>;

			expect(entry).toEqual(expectedEntry);
		});
	});
});
