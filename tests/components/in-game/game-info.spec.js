import React from 'react';
import sinon from 'sinon';
import { Icon } from 'react-native-elements';
import { shallow } from 'enzyme';

import GameSummary from '../../../src/components/in-game/game-summary';
import { GameInfo } from '../../../src/components/in-game/game-info';

describe('Given <GameInfo />', () => {
	const dispatch = sinon.stub();
	const getParam = sinon.stub();
	const navigate = sinon.stub();
	const setParams = sinon.stub();
	const navigation = {
		dispatch,
		getParam,
		navigate,
		setParams
	};
	const ended = true;
	const player1 = { name: 'Tom', id: 1 };
	const player2 = { name: 'Fred', id: 2 };
	const players = [ player1, player2 ];
	const score1 = { id: player1.id, position: 1, score: 100 };
	const score2 = { id: player2.id, position: 2, score: 10 };
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
	const settings = {};
	const winners = [ 'a', 'b' ];
	const props = {
		ended,
		leaderboard,
		navigation,
		players,
		scores,
		settings,
		winners
	};
	const renderedComponent = shallow(<GameInfo { ...props } />);

	afterEach(() => setParams.reset());

	it('should be a `GameSummary`', () => {
		expect(renderedComponent.is(GameSummary)).toBe(true);
	});

	it('should have an `ended` prop', () => {
		expect(renderedComponent.prop('ended')).toEqual(ended);
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

	it('should have a `winners` prop', () => {
		expect(renderedComponent.prop('winners')).toEqual(winners);
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
	});

	describe('when the component updates', () => {
		it('should call `setParams` if the game has NOT ended', () => {
			renderedComponent.setProps({ ended: true });
			renderedComponent.instance().componentDidUpdate({ ended: false });

			expect(setParams.withArgs({ ended: true }).calledOnce).toBe(true);
		});

		it('should NOT call `setParams` if the game has already ended', () => {
			renderedComponent.setProps({ ended: false });
			renderedComponent.instance().componentDidUpdate({ ended: false });

			expect(setParams.notCalled).toBe(true);
		});
	});
});
