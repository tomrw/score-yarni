import React from 'react';
import sinon from 'sinon';
import { List } from 'react-native-elements';
import { shallow } from 'enzyme';

import Header from '../../../src/components/common/header';
import HistoryEntry from '../../../src/components/history/history-entry';
import { History } from '../../../src/components/history/history';

describe('Given <History />', () => {
	const history = [
		{
			config: { maxGameScore: 20 },
			leaderboard: [],
			players: [
				{ id: 1, name: 'Tom' },
				{ id: 2, name: 'Chloe' }
			],
			scores: []
		},
		{
			config: { maxGameScore: 150 },
			leaderboard: [],
			players: [
				{ id: 3, name: 'Fred' },
				{ id: 4, name: 'Bob' }
			],
			scores: []
		}
	];
	const navigateTo = sinon.stub();
	const props = {
		history,
		navigateTo
	};
	const renderedComponent = shallow(<History { ...props } />);

	it('should be a `View`', () => {
		expect(renderedComponent.is('View')).toBe(true);
	});

	describe('and its first child', () => {
		const header = renderedComponent.childAt(0);

		it('should be a `Header`', () => {
			expect(header.is(Header)).toBe(true);
		});

		it('should have a `text` prop', () => {
			const expectedText = 'Past Games';

			expect(header.prop('text')).toEqual(expectedText);
		});

		describe('when the `onClose` prop is called', () => {
			const onClose = header.prop('onClose');

			onClose();

			it('should call `navigateTo` when the `onClose` prop is triggered', () => {
				expect(navigateTo.withArgs('HOME').calledOnce).toBe(true);
			});
		});
	});

	describe('and its second child', () => {
		const list = renderedComponent.childAt(1);

		it('should be a `List`', () => {
			expect(list.is(List)).toBe(true);
		});

		it('should have the expected number of children', () => {
			expect(list.children()).toHaveLength(history.length);
		});

		history.forEach((history, i) => {
			describe(`when rendering the history item at index ${ i }`, () => {
				const entry = list.childAt(i);

				it('should be a `HistoryEntry', () => {
					expect(entry.is(HistoryEntry)).toBe(true);
				});

				it('should have a `key` prop', () => {
					const expectedKey = i.toString();

					expect(entry.key()).toEqual(expectedKey);
				});

				it('should have a `player` prop', () => {
					expect(entry.prop('players')).toEqual(history.players);
				});
			});
		});
	});
});
