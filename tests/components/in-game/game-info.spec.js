import React from 'react';
import sinon from 'sinon';
import { Icon } from 'react-native-elements';
import { shallow } from 'enzyme';

import { GameInfo } from '../../../src/components/in-game/game-info';
import GameSummary from '../../../src/components/in-game/game-summary';

describe('Given <GameInfo />', () => {
	const navigate = sinon.stub();
	const navigation = { navigate };
	const player1 = { name: 'Tom', id: 1 };
	const player2 = { name: 'Fred', id: 2 };
	const players = [ player1, player2 ];
	const score1 = { id: player1.id, position: 1, score: 100 };
	const score2 = { id: player2.id, position: 2, score: 10 };
	const leaderboard = [ score1, score2 ];
	const scores = [
		{ id: 1, score: 10 },
		{ id: 2, score: 20 },
		{ id: 1, score: 30 },
		{ id: 2, score: 40 }
	];
	const settings = {};
	const props = {
		leaderboard,
		players,
		scores,
		settings
	};
	const renderedComponent = shallow(<GameInfo { ...props } />);

	it('should be a `GameSummary`', () => {
		expect(renderedComponent.is(GameSummary)).toBe(true);
	});

	it('should have a `leaderboard` prop', () => {
		expect(renderedComponent.prop('leaderboard')).toEqual(leaderboard);
	});

	it('should have a `players` prop', () => {
		expect(renderedComponent.prop('players')).toEqual(players);
	});

	it('should have a `scores` prop', () => {
		expect(renderedComponent.prop('scores')).toEqual(scores);
	});

	it('should have a `settings` prop', () => {
		expect(renderedComponent.prop('settings')).toEqual(settings);
	});

	describe('and its navigation options', () => {
		const options = GameInfo.navigationOptions({ navigation });

		it('should have the correct `title`', () => {
			const expectedTitle = 'Leaderboard';

			expect(options.title).toEqual(expectedTitle);
		});

		it('should NOT have a `headerLeft`', () => {
			expect(options.headerLeft).toBeNull();
		});

		describe('and its icon', () => {
			const icon = options.tabBarIcon;

			it('should be an `Icon`', () => {
				const expectedIcon = <Icon name="format-list-numbered" />;

				expect(icon).toEqual(expectedIcon);
			});
		});

		describe('and its header right', () => {
			const headerRight = options.headerRight;

			it('should navigate to `HOME` when closed', () => {
				const onClose = headerRight.props.onClose;

				onClose();

				expect(navigate.withArgs('HOME').calledOnce).toBe(true);
			});
		});
	});
});
