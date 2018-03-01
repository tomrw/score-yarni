import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import AddScores from '../../../src/components/in-game/add-scores';

import addScoreStyles from '../../../src/components/in-game/styles/add-scores';

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

		it('should be a `List`', () => {
			expect(playerScores.is('List')).toBe(true);
		});

		it('should have the `container` styles', () => {
			expect(playerScores.prop('containerStyle')).toEqual(addScoreStyles.container);
		});

		describe('when rendering the entries', () => {
			it('should render the expected number of children', () => {
				expect(renderedComponent.children()).toHaveLength(data.length);
			});

			data.forEach((entry, i) => {
				describe(`for the entry at index ${ i }`, () => {
					const renderedEntry = playerScores.childAt(i);

					it('should be an `AddPlayerScore`', () => {
						expect(renderedEntry.is('AddPlayerScore')).toBe(true);
					});

					it('should have an `id` prop', () => {
						expect(renderedEntry.prop('id')).toEqual(entry.id);
					});

					it('should have a `name` prop', () => {
						expect(renderedEntry.prop('name')).toEqual(entry.name);
					});

					it('should have a `score` prop', () => {
						expect(renderedEntry.prop('score')).toEqual(entry.score);
					});

					it('should have an `addPendingScore` prop', () => {
						expect(renderedEntry.prop('addPendingScore')).toEqual(addPendingScore);
					});
				});
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
