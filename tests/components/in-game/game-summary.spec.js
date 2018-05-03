import React from 'react';
import { shallow } from 'enzyme';

import GameSummary from '../../../src/components/in-game/game-summary';
import GameEndedSummary from '../../../src/components/in-game/game-ended-summary';

import gameSummaryStyles from '../../../src/components/in-game/styles/game-summary';

describe('Given <GameSummary />', () => {
	const player1 = { name: 'Tom', id: 1 };
	const player2 = { name: 'Fred', id: 2 };
	const players = [ player1, player2 ];
	const score1 = { id: player1.id, score: 100 };
	const score2 = { id: player2.id, score: 10 };
	const leaderboard = [
		{ position: 1, scores: [ score1 ] },
		{ position: 2, scores: [ score2 ] }
	];
	const scores = [
		{ id: 1, score: 10 },
		{ id: 2, score: 20 },
		{ id: 1, score: 30 },
		{ id: 2, score: 40 }
	];
	const props = {
		players,
		leaderboard,
		scores
	};
	const renderedComponent = shallow(<GameSummary { ...props } />);

	it('should be a `ScrollView`', () => {
		expect(renderedComponent.is('ScrollViewMock')).toBe(true);
	});

	describe('and its first child', () => {
		const leaderboardHeading = renderedComponent.childAt(0);

		it('should be a `Text`', () => {
			expect(leaderboardHeading.is('TextElement')).toBe(true);
		});

		it('should have the `heading` styles', () => {
			expect(leaderboardHeading.prop('style')).toEqual(gameSummaryStyles.heading);
		});
	});

	describe('and its second child', () => {
		const leaderboard = renderedComponent.childAt(1);

		it('should be a `Leaderboard`', () => {
			expect(leaderboard.is('Leaderboard')).toBe(true);
		});

		it('should have a `leaderboardData` prop', () => {
			const expectedData = [
				{
					position: 1,
					scores: [ { name: player1.name, score: score1.score } ]
				},
				{
					position: 2,
					scores: [ { name: player2.name, score: score2.score } ]
				}
			];

			expect(leaderboard.prop('leaderboardData')).toEqual(expectedData);
		});
	});

	describe('and its third child', () => {
		const scoreboardHeading = renderedComponent.childAt(2);

		it('should be a `Text`', () => {
			expect(scoreboardHeading.is('TextElement')).toBe(true);
		});

		it('should have the `heading` styles', () => {
			expect(scoreboardHeading.prop('style')).toEqual(gameSummaryStyles.heading);
		});
	});

	describe('and its fourth child', () => {
		const scoreboard = renderedComponent.childAt(3);

		it('should be a `Scoreboard`', () => {
			expect(scoreboard.is('Scoreboard')).toBe(true);
		});

		it('should have a `scoreboardData` prop', () => {
			const scores1 = scores.filter(score => score.id === player1.id).map(score => score.score);
			const scores2 = scores.filter(score => score.id === player2.id).map(score => score.score);
			const expectedData = [
				{ name: player1.name, scores: scores1 },
				{ name: player2.name, scores: scores2 }
			];

			expect(scoreboard.prop('scoreboardData')).toEqual(expectedData);
		});

		it('should NOT have a `reverse` prop', () => {
			expect(scoreboard.prop('reverse')).toBeUndefined();
		});

		describe('when the scoreboard is reversed', () => {
			const newProps = {
				...props,
				settings: {
					reverseScoreboard: true
				}
			};
			const renderedComponent = shallow(<GameSummary { ...newProps } />);
			const scoreboard = renderedComponent.childAt(3);

			it('should have a `reverse/ true` prop', () => {
				expect(scoreboard.prop('reverse')).toBe(true);
			});
		});
	});

	describe('when the game has ended', () => {
		const winners = [ 'a', 'b' ];
		const newProps = {
			ended: true,
			winners,
			...props
		};
		const renderedComponent = shallow(<GameSummary { ...newProps } />);

		describe('and the first child', () => {
			const gameEndedSummary = renderedComponent.childAt(0);

			it('should be a `GameEndedSummary`', () => {
				expect(gameEndedSummary.is(GameEndedSummary)).toBe(true);
			});

			it('should have a `winners` prop', () => {
				expect(gameEndedSummary.prop('winners')).toEqual(winners);
			});
		});
	});
});
