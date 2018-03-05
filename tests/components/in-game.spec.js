import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import AddScores from '../../src/components/in-game/add-scores';
import GameSummary from '../../src/components/in-game/game-summary';
import Header from '../../src/components/common/header';
import NavigationBar from '../../src/components/in-game/navigation-bar';
import { InGame } from '../../src/components/in-game';

import inGameStyles from '../../src/components/styles/in-game';

describe('Given <InGame />', () => {
	const player1 = { name: 'Tom', id: 1 };
	const player2 = { name: 'Fred', id: 2 };
	const players = [ player1, player2 ];
	const score1 = { id: player1.id, position: 1, score: 100 };
	const score2 = { id: player2.id, position: 2, score: 10 };
	const leaderboard = [ score1, score2 ];
	const scores = [ score1, score2 ];
	const pendingScores = [ { id: player1.id, score: 100 } ];
	const addPendingScore = sinon.stub();
	const confirmAllPendingScores = sinon.stub();
	const navigateTo = sinon.stub();
	const resetGame = sinon.stub();
	const settings = { a: 'b', c: 'd' };
	const props = {
		addPendingScore,
		confirmAllPendingScores,
		leaderboard,
		navigateTo,
		pendingScores,
		players,
		resetGame,
		scores,
		settings
	};
	const renderedComponent = shallow(<InGame { ...props } />);

	it('should be a `View`', () => {
		expect(renderedComponent.is('View')).toBe(true);
	});

	it('should have the `container` styles', () => {
		expect(renderedComponent.prop('style')).toEqual(inGameStyles.container);
	});

	describe('and its first child', () => {
		const header = renderedComponent.childAt(0);

		it('should be a `Header`', () => {
			expect(header.is(Header)).toBe(true);
		});

		it('should have a `text` prop', () => {
			expect(header.prop('text')).not.toEqual('');
		});

		describe('when the `onClose` prop is called', () => {
			const onClose = header.prop('onClose');

			onClose();

			it('should call `navigateTo` when the `onClose` prop is triggered', () => {
				expect(navigateTo.withArgs('HOME').calledOnce).toBe(true);
			});

			it('should call `resetGame`', () => {
				expect(resetGame.calledOnce).toBe(true);
			});
		});
	});

	describe('and its second child', () => {
		describe('when no view is specified', () => {
			const gameSummary = renderedComponent.childAt(1);

			it('should be a <GameSummary />', () => {
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

		describe('when the `addScores` view is specified', () => {
			const newProps = {
				...props,
				view: 'ADD_SCORES'
			};
			const renderedComponent = shallow(<InGame { ...newProps } />);
			const addScores = renderedComponent.childAt(1);

			it('should be a `<InGame />`', () => {
				expect(addScores.is(AddScores)).toBe(true);
			});

			it('should have a `data` prop', () => {
				const pendingScore1 = pendingScores[0];
				const expectedData = [
					{ id: player1.id, name: player1.name, score: pendingScore1.score },
					{ id: player2.id, name: player2.name, score: 0 }
				];

				expect(addScores.prop('data')).toEqual(expectedData);
			});

			it('should have an `addPendingScore` prop', () => {
				expect(addScores.prop('addPendingScore')).toEqual(addPendingScore);
			});

			describe('when the `confirmScores` prop is called', () => {
				addScores.prop('confirmScores')();

				it('should call `confirmAllPendingScores`', () => {
					expect(confirmAllPendingScores.calledOnce).toBe(true);
				});

				it('should call `navigateTo` with the correct props', () => {
					const expectedView = 'GAME_IN_PROGRESS';
					const expectedChild = 'LEADERBOARD';

					expect(navigateTo.withArgs(expectedView, expectedChild).calledOnce).toBe(true);
				});
			});
		});
	});

	describe('and its third child', () => {
		const navBar = renderedComponent.childAt(2);

		it('should be a `navigationBar`', () => {
			expect(navBar.is(NavigationBar)).toBe(true);
		});

		it('should have the `navigationBar` styles', () => {
			expect(navBar.prop('style')).toEqual(inGameStyles.navigationBar);
		});
	});
});
