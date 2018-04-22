import React from 'react';
import { shallow } from 'enzyme';
import { Text, View } from 'react-native';

import NoPastGames from '../../../src/components/history/no-past-games';
import noPastGamesStyles from '../../../src/components/history/styles/no-past-games';

describe('Given <NoPastGames />', () => {
	const renderedComponent = shallow(<NoPastGames />);

	it('should be a `View`', () => {
		expect(renderedComponent.is(View)).toBe(true);
	});

	describe('and its first child', () => {
		const heading = renderedComponent.childAt(0);

		it('should be a `Text`', () => {
			expect(heading.is(Text)).toBe(true);
		});

		it('should have the `heading` styles', () => {
			expect(heading.prop('style')).toEqual(noPastGamesStyles.heading);
		});

		it('should have the expected text', () => {
			const expectedText = 'No Past Games';

			expect(heading.props().children).toEqual(expectedText);
		});
	});

	describe('and its second child', () => {
		const body = renderedComponent.childAt(1);

		it('should be a `Text`', () => {
			expect(body.is(Text)).toBe(true);
		});

		it('should have the `body` styles', () => {
			expect(body.prop('style')).toEqual(noPastGamesStyles.body);
		});

		it('should have the expected text', () => {
			const expectedText = 'You haven\'t played any previous games. Play some to see them here!';

			expect(body.props().children).toEqual(expectedText);
		});
	});
});
