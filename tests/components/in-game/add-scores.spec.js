import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import AddScores from '../../../src/components/in-game/add-scores';
import AddPlayerScore from '../../../src/components/in-game/add-player-score';

describe('Given <AddScores />', () => {
	const addPendingScore = sinon.stub();
	const confirmScores = sinon.stub();
	const player1 = { name: 'Tom', id: 1, score: 0 };
	const player2 = { name: 'Fred', id: 2, score: 10 };
	const data = [ player1, player2 ];
	const props = {
		addPendingScore,
		confirmScores,
		data
	};
	const renderedComponent = shallow(<AddScores { ...props } />);

	it('should be a `View`', () => {
		expect(renderedComponent.is('View')).toBe(true);
	});

	describe('and its first child', () => {
		const playerScores = renderedComponent.childAt(0);

		it('should be a `FlatList`', () => {
			expect(playerScores.is('FlatList')).toBe(true);
		});

		it('should have a `data` prop', () => {
			expect(playerScores.prop('data')).toEqual(data);
		});

		it('should have a `keyExtractor` prop', () => {
			const index = 1234;
			const item = null;
			const keyExtractor = playerScores.prop('keyExtractor')(item, index);

			expect(keyExtractor).toEqual(index);
		});

		describe('when rendering each <AddPlayerScore />', () => {
			const entry1 = data[0];
			const args = {
				item: entry1
			};
			const entry = playerScores.prop('renderItem')(args);

			it('should render an entry correctly', () => {
				const expectedEntry = <AddPlayerScore
					id={ entry1.id }
					addPendingScore={ addPendingScore }
					name={ entry1.name }
					score={ 0 } />;

				expect(entry).toEqual(expectedEntry);
			});
		});
	});

	describe('and its second child', () => {
		const confirmScoresButton = renderedComponent.childAt(1);

		it('should be a `ConfirmScores`', () => {
			expect(confirmScoresButton.is('ConfirmScores')).toBe(true);
		});

		it('should have an `onConfirmScores` prop', () => {
			expect(confirmScoresButton.prop('onConfirmScores')).toEqual(confirmScores);
		});
	});
});
