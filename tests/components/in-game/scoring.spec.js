import React from 'react';
import sinon from 'sinon';
import { Icon } from 'react-native-elements';
import { Text } from 'react-native';
import { shallow } from 'enzyme';

import AddScores from '../../../src/components/in-game/add-scores';
import { Scoring } from '../../../src/components/in-game/scoring';

describe('Given <Scoring />', () => {
	const addPendingScore = sinon.stub();
	const confirmAllPendingScores = sinon.stub();
	const dispatch = sinon.stub();
	const navigate = sinon.stub();
	const navigation = {
		dispatch,
		navigate
	};
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
		navigation
	};
	const renderedComponent = shallow(<Scoring { ...props } />);

	it('should be a `AddScores`', () => {
		expect(renderedComponent.is(AddScores)).toBe(true);
	});

	describe('and its navigation options', () => {
		const options = Scoring.navigationOptions({ navigation });

		it('should have the correct `title`', () => {
			const expectedTitle = 'Add Scores';

			expect(options.title).toEqual(expectedTitle);
		});

		it('should have the correct `topBarLabel`', () => {
			const expectedTopBarLabel = 'Add Scores';

			expect(options.title).toEqual(expectedTopBarLabel);
		});

		it('should NOT have a `headerLeft`', () => {
			expect(options.headerLeft).toBeNull();
		});

		describe('and its icon', () => {
			const icon = options.tabBarIcon;

			it('should be an `Icon`', () => {
				const expectedIcon = <Icon name="library-add" />;

				expect(icon).toEqual(expectedIcon);
			});
		});
	});

	describe('and when the game has ended', () => {
		const newProps = {
			...props,
			ended: true
		};
		const renderedComponent = shallow(<Scoring { ...newProps } />);

		it('should be a `Text`', () => {
			expect(renderedComponent.is(Text)).toBe(true);
		});

		it('should have the correct text', () => {
			const expectedText = 'Ended!';

			expect(renderedComponent.props().children).toEqual(expectedText);
		});
	});
});
