import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { ScrollView, View } from 'react-native';
import { List } from 'react-native-elements';

import ConfirmScores from '../../../src/components/in-game/confirm-scores';
import AddScores from '../../../src/components/in-game/add-scores';

import addScoreStyles from '../../../src/components/in-game/styles/add-scores';

describe('Given <AddScores />', () => {
	const addPendingScore = sinon.stub();
	const confirmAllPendingScores = sinon.stub();
	const navigateTo = sinon.stub();
	const pendingScores = [
		{ id: 1, score: 10 },
		{ id: 2, score: 20 }
	];
	const players = [
		{ name: 'Tom', id: 1 },
		{ name: 'Fred', id: 2 }
	];
	const props = {
		addPendingScore,
		confirmAllPendingScores,
		pendingScores,
		players,
		navigateTo
	};
	const renderedComponent = shallow(<AddScores { ...props } />);

	it('should be a `View`', () => {
		expect(renderedComponent.is(View)).toBe(true);
	});

	it('should have the `container` styles', () => {
		expect(renderedComponent.prop('style')).toEqual(addScoreStyles.container);
	});

	describe('and its first child', () => {
		const scrollWrapper = renderedComponent.childAt(0);

		it('should be a `ScrollView', () => {
			expect(scrollWrapper.is(ScrollView)).toBe(true);
		});

		it('should have the `list` styles', () => {
			expect(scrollWrapper.prop('style')).toEqual(addScoreStyles.list);
		});

		it('should have a `alwaysBounceVertical/false` prop', () => {
			expect(scrollWrapper.prop('alwaysBounceVertical')).toBe(false);
		});

		describe('and its first child', () => {
			const playerScores = scrollWrapper.childAt(0);

			it('should be a `List`', () => {
				expect(playerScores.is(List)).toBe(true);
			});

			describe('when rendering the entries', () => {
				it('should render the expected number of children', () => {
					expect(renderedComponent.children()).toHaveLength(players.length);
				});

				players.forEach((entry, i) => {
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
							expect(renderedEntry.prop('score')).toEqual(pendingScores[i].score);
						});

						it('should have an `addPendingScore` prop', () => {
							expect(renderedEntry.prop('addPendingScore')).toEqual(addPendingScore);
						});
					});
				});
			});
		});
	});

	describe('and its second child', () => {
		const confirmScoresButton = renderedComponent.childAt(1);

		it('should be a `ConfirmScores`', () => {
			expect(confirmScoresButton.is(ConfirmScores)).toBe(true);
		});

		describe('when the `onConfirmScores` prop is called', () => {
			const onConfirmScores = confirmScoresButton.prop('onConfirmScores');

			onConfirmScores();

			it('should call `confirmAllPendingScores`', () => {
				expect(confirmAllPendingScores.calledOnce).toBe(true);
			});

			it('should call the `navigate` prop', () => {
				expect(navigateTo.withArgs('gameInfo').calledOnce).toBe(true);
			});
		});
	});
});
