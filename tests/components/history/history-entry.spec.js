import React from 'react';
import { shallow } from 'enzyme';
import { ListItem } from 'react-native-elements';

import HistoryEntry from '../../../src/components/history/history-entry';

describe('Given <HistoryEntry />', () => {
	const player1 = { id: 1, name: 'Tom' };
	const player2 = { id: 2, name: 'Fred' };
	const player3 = { id: 3, name: 'Jimmy' };
	const players = [ player1, player2, player3 ];
	const props = {
		players
	};
	const renderedComponent = shallow(<HistoryEntry { ...props } />);

	it('should be a `ListItem`', () => {
		expect(renderedComponent.is(ListItem)).toBe(true);
	});

	it('should have a `titleNumberOfLines` prop', () => {
		expect(renderedComponent.prop('titleNumberOfLines')).toEqual(0);
	});

	it('should have a `leftIcon` prop', () => {
		const expectedIcon = { name: 'people' };

		expect(renderedComponent.prop('leftIcon')).toEqual(expectedIcon);
	});

	describe('and its title', () => {
		const getTitle = players => {
			const newProps = {
				...props,
				players
			};
			const renderedComponent = shallow(<HistoryEntry { ...newProps } />);
			const title = renderedComponent.prop('title');

			return title;
		};

		it('should read properly when there is only one player', () => {
			const title = getTitle([ player1 ]);

			expect(title).toEqual(player1.name);
		});

		it('should read properly when there are two players', () => {
			const title = getTitle([ player1, player2 ]);
			const expectedTitle = `${ player1.name } and ${ player2.name }`;

			expect(title).toEqual(expectedTitle);
		});

		it('should read properly when there are more than two players', () => {
			const title = getTitle([ player1, player2, player3 ]);
			const expectedTitle = `${ player1.name }, ${ player2.name } and ${ player3.name }`;

			expect(title).toEqual(expectedTitle);
		});

		it('should read properly when there are four or more players', () => {
			const title = getTitle([ player1, player2, player3, player1, player2, player3 ]);
			const expectedTitle = `${ player1.name }, ${ player2.name }, ${ player3.name }, ${ player1.name } and others`;

			expect(title).toEqual(expectedTitle);
		});
	});
});
