import React from 'react';
import { shallow } from 'enzyme';
import { View } from 'react-native';

import GameSummary from '../../../src/components/in-game/game-summary';
import HistoryDetail from '../../../src/components/history/history-detail';

describe('Given <HistoryDetail />', () => {
	const leaderboard = [
		{ id: 1, position: 1, score: 130 },
		{ id: 2, position: 2, score: 90 }
	];
	const scores = [
		{ id: 1, score: 100 },
		{ id: 2, score: 20 },
		{ id: 1, score: 30 },
		{ id: 2, score: 40 }
	];
	const players = [
		{ id: 1, name: 'Tom' },
		{ id: 2, name: 'Fred' }
	];
	const props = {
		leaderboard,
		players,
		scores
	};
	const renderedComponent = shallow(<HistoryDetail { ...props } />);

	it('should be a `View`', () => {
		expect(renderedComponent.is(View)).toBe(true);
	});

	describe('and its first child', () => {
		const gameSummary = renderedComponent.childAt(0);

		it('should be a `GameSummary`', () => {
			expect(gameSummary.is(GameSummary)).toBe(true);
		});

		it('should have a `leaderboard` prop', () => {
			expect(gameSummary.prop('leaderboard')).toEqual(leaderboard);
		});

		it('should have a `players` prop', () => {
			expect(gameSummary.prop('players')).toEqual(players);
		});

		it('should have a `scores` prop', () => {
			expect(gameSummary.prop('scores')).toEqual(scores);
		});
	});
});
