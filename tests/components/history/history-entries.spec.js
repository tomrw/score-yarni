import React from 'react';
import sinon from 'sinon';
import { List } from 'react-native-elements';
import { shallow } from 'enzyme';

import HistoryEntries from '../../../src/components/history/history-entries';
import HistoryEntry from '../../../src/components/history/history-entry';

describe('Given <HistoryEntries />', () => {
	const navigateTo = sinon.stub();
	const players1 = [
		{ id: 1, name: 'Tom' },
		{ id: 2, name: 'Fred' }
	];
	const players2 = [
		{ id: 3, name: 'Fred' },
		{ id: 4, name: 'Bob' }
	];
	const historyData = [
		{ players: players1 },
		{ players: players2 }
	];
	const props = {
		historyData,
		navigateTo
	};
	const renderedComponent = shallow(<HistoryEntries { ...props } />);

	afterEach(() => {
		navigateTo.reset();
	});

	it('should be a `List`', () => {
		expect(renderedComponent.is(List)).toBe(true);
	});

	it('should have the expected number of children', () => {
		expect(renderedComponent.children()).toHaveLength(historyData.length);
	});

	historyData.forEach((history, i) => {
		describe(`when rendering the history item at index ${ i }`, () => {
			const entry = renderedComponent.childAt(i);

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

			describe('when pressed', () => {
				it('should call `navigateTo` with an `entryId`', () => {
					const onPress = entry.prop('onPress');

					onPress();

					expect(navigateTo.withArgs('HISTORY', { entryId: i }).calledOnce).toBe(true);
				});
			});
		});
	});
});
