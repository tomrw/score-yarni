import React from 'react';
import { shallow } from 'enzyme';
import { Text } from 'react-native';

import LeaderboardEntry from '../../../src/components/in-game/leaderboard-entry';

import leaderboardEntryStyles from '../../../src/components/in-game/styles/leaderboard-entry';

describe('Given <LeaderboardEntry />', () => {
	const position = 1;
	const name = 'Tom';
	const score = 100;
	const props = {
		position,
		name,
		score
	};
	const renderedComponent = shallow(<LeaderboardEntry { ...props } />);

	it('should be a `ListItem`', () => {
		expect(renderedComponent.is('ListItem')).toBe(true);
	});

	it('should have the correct `wrapper` styles', () => {
		expect(renderedComponent.prop('wrapperStyle')).toEqual(leaderboardEntryStyles.container);
	});

	it('should have the correct `leftIcon` prop', () => {
		const leftIcon = renderedComponent.prop('leftIcon');
		const expectedLeftIcon = <Text style={ leaderboardEntryStyles.position }>{position}</Text>;

		expect(leftIcon).toEqual(expectedLeftIcon);
	});

	it('should have the correct `rightIcon` prop', () => {
		const rightIcon = renderedComponent.prop('rightIcon');
		const expectedRightIcon = <Text>{ score }</Text>;

		expect(rightIcon).toEqual(expectedRightIcon);
	});

	it('should have the correct `title` prop', () => {
		expect(renderedComponent.prop('title')).toEqual(name);
	});
});
