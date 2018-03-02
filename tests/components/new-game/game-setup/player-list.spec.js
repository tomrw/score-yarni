import React from 'react';
import { shallow } from 'enzyme';

import PlayerList from '../../../../src/components/new-game/game-setup/player-list';

describe('Given <PlayerList />', () => {
	const player1 = { name: 'Tom', id: 1 };
	const player2 = { name: 'Fred', id: 2 };
	const playerList = [ player1, player2 ];
	const removePlayer = () => {};
	const renderedComponent = shallow(<PlayerList playerList={ playerList } removePlayer={ removePlayer } />);

	it('should be a `List`', () => {
		expect(renderedComponent.is('List')).toBe(true);
	});

	describe('when rendering the players', () => {
		it('should render the expected number of children', () => {
			expect(renderedComponent.children()).toHaveLength(playerList.length);
		});

		playerList.forEach((entry, i) => {
			describe(`for the entry at position ${ i }`, () => {
				const renderedEntry = renderedComponent.childAt(i);

				it('should be a `Player`', () => {
					expect(renderedEntry.is('Player')).toBe(true);
				});

				it('should have a `name` prop', () => {
					expect(renderedEntry.prop('name')).toEqual(entry.name);
				});

				it('should have a `id` prop', () => {
					expect(renderedEntry.prop('id')).toEqual(entry.id);
				});

				it('should have a `removePlayer` prop', () => {
					expect(renderedEntry.prop('removePlayer')).toEqual(removePlayer);
				});
			});
		});
	});

	describe('when there are NO players', () => {
		it('should NOT render anything', () => {
			const renderedComponent = shallow(<PlayerList playerList={ [] } removePlayer={ removePlayer } />);

			expect(renderedComponent.type()).toBeNull();
		});
	});
});
