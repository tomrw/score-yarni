import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { View } from 'react-native';

import NewPlayerForm from '../../../src/components/new-game/game-setup/new-player-form';
import PlayerList from '../../../src/components/new-game/game-setup/player-list';
import GameSetup from '../../../src/components/new-game/game-setup';

import gameSetupStyles from '../../../src/components/new-game/styles/game-setup';

describe('Given <GameSetup />', () => {
	const addPlayer = sinon.stub();
	const removePlayer = sinon.stub();
	const players = [
		{ id: 1, name: 'Player 1' },
		{ id: 2, name: 'Player 2' }
	];
	const props = {
		addPlayer,
		players,
		removePlayer
	};
	const renderedComponent = shallow(<GameSetup { ...props } />);

	it('should be a `View`', () => {
		expect(renderedComponent.is(View)).toBe(true);
	});

	it('should have the `container` styles', () => {
		expect(renderedComponent.prop('style')).toEqual(gameSetupStyles.container);
	});

	describe('and its first child', () => {
		const newPlayerform = renderedComponent.childAt(0);

		it('should be a <NewPlayerForm />', () => {
			expect(newPlayerform.is(NewPlayerForm)).toBe(true);
		});

		it('should have a `playerAdded` prop', () => {
			expect(newPlayerform.prop('playerAdded')).toEqual(addPlayer);
		});
	});

	describe('and its players list wrapper', () => {
		const playerListWrapper = renderedComponent.childAt(1);

		it('should have the `player-list-wrapper` styles', () => {
			expect(playerListWrapper.prop('style')).toEqual(gameSetupStyles.playerListWrapper);
		});

		it('should contain a <PlayerList />', () => {
			expect(playerListWrapper.find(PlayerList).exists()).toBe(true);
		});

		it('should have a `playerList` prop', () => {
			expect(playerListWrapper.find(PlayerList).prop('playerList')).toBe(players);
		});

		it('should have a `removePlayer` prop', () => {
			expect(playerListWrapper.find(PlayerList).prop('removePlayer')).toBe(removePlayer);
		});
	});
});
