import React from 'react';
import { shallow } from 'enzyme';

import PlayerList from '../../../../src/components/new-game/game-setup/player-list';
import Player from '../../../../src/components/new-game/game-setup/player';

describe('Given <PlayerList />', () => {
	const player1 = { name: 'Player 1', id: 1 };
	const playerList = [ player1 ];
	const removePlayer = () => {};
	const renderedComponent = shallow(<PlayerList playerList={ playerList } removePlayer={ removePlayer } />);

	it('should be a `FlatList`', () => {
		expect(renderedComponent.is('FlatList')).toBe(true);
	});

	it('should have a `data` prop', () => {
		expect(renderedComponent.prop('data')).toEqual(playerList);
	});

	it('should have a `keyExtractor` prop', () => {
		const index = 1234;
		const item = player1;
		const keyExtractor = renderedComponent.prop('keyExtractor')(item, index);

		expect(keyExtractor).toEqual(index);
	});

	describe('when rendering a player', () => {
		const args = {
			item: player1
		};
		const player = renderedComponent.prop('renderItem')(args);

		it('should render a player correctly', () => {
			const expectedPlayer = <Player
				id={ player1.id }
				name={ player1.name }
				removePlayer={ removePlayer } />;

			expect(player).toEqual(expectedPlayer);
		});
	});
});
