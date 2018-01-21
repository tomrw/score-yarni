import React from 'react';
import { shallow } from 'enzyme';

import LeaderboardEntry from '../../../src/components/in-game/leaderboard-entry';

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

	it('should be a `Text`', () => {
		expect(renderedComponent.is('Text')).toBe(true);
	});

	it('should have the correct value', () => {
		const expectedText = `${ position } ${ name } ${ score }`;

		expect(renderedComponent.props().children.join('')).toEqual(expectedText);
	});
});
