import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import HistoryEntries from '../../../src/components/history/history-entries';
import { History } from '../../../src/components/history/history';

describe('Given <History />', () => {
	const players1 = [
		{ id: 1, name: 'Tom' },
		{ id: 2, name: 'Chloe' }
	];
	const players2 = [
		{ id: 3, name: 'Fred' },
		{ id: 4, name: 'Bob' }
	];
	const history = [
		{
			config: { maxGameScore: 20 },
			leaderboard: [],
			players: players1,
			scores: []
		},
		{
			config: { maxGameScore: 150 },
			leaderboard: [],
			players: players2,
			scores: []
		}
	];
	const navigate = sinon.stub();
	const navigation = {
		navigate,
		state: {}
	};
	const props = {
		history,
		navigation
	};
	const renderedComponent = shallow(<History { ...props } />);

	it('should be a `View`', () => {
		expect(renderedComponent.is('View')).toBe(true);
	});

	describe('and its navigation options', () => {
		it('should have the correct `title`', () => {
			const expectedTitle = 'Past Games';

			expect(History.navigationOptions.title).toEqual(expectedTitle);
		});
	});

	describe('and its first child', () => {
		const historyEntries = renderedComponent.childAt(0);

		it('should be a `HistoryEntries`', () => {
			expect(historyEntries.is(HistoryEntries)).toBe(true);
		});

		it('should have a `historyData` prop', () => {
			const expectedHistoryData = [
				{ players: players1 },
				{ players: players2 }
			];

			expect(historyEntries.prop('historyData')).toEqual(expectedHistoryData);
		});

		it('should have a `navigateTo` prop', () => {
			expect(historyEntries.prop('navigateTo')).toEqual(navigate);
		});
	});
});
