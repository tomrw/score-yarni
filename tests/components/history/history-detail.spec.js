import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { ScrollView } from 'react-native';

import GameSummary from '../../../src/components/in-game/game-summary';
import { HistoryDetail } from '../../../src/components/history/history-detail';

describe('Given <HistoryDetail />', () => {
	const dispatch = sinon.stub();
	const goBack = sinon.stub();
	const navigation = {
		dispatch,
		goBack,
		state: {
			params: {
				entryId: 0
			}
		}
	};
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
	const winners = [ 'Fred' ];
	const props = {
		history: [
			{
				leaderboard,
				players,
				scores,
				winners
			}
		],
		navigation
	};
	const renderedComponent = shallow(<HistoryDetail { ...props } />);

	it('should be a `ScrollView`', () => {
		expect(renderedComponent.is(ScrollView)).toBe(true);
	});

	describe('and its navigation options', () => {
		const options = HistoryDetail.navigationOptions({ navigation });

		it('should have the correct `title`', () => {
			const expectedTitle = 'Hello!';

			expect(options.title).toEqual(expectedTitle);
		});
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

		it('should have an `ended` prop', () => {
			expect(gameSummary.prop('ended')).toBe(true);
		});

		it('should have a `winners` prop', () => {
			expect(gameSummary.prop('winners')).toEqual(winners);
		});
	});

	describe('when the history entry does NOT exist', () => {
		const newProps = {
			...props,
			navigation: {
				state: {
					params: {
						entryId: 100
					}
				}
			}
		};
		const renderedComponent = shallow(<HistoryDetail { ...newProps } />);

		it('should return `null`', () => {
			expect(renderedComponent.instance()).toBeNull();
		});
	});
});
