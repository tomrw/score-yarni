import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import AddPlayerScore from '../../../src/components/in-game/add-player-score';

import addPlayerScoreStyles from '../../../src/components/in-game/styles/add-player-score';

describe('Given <AddPlayerScore />', () => {
	const id = 7;
	const name = 'Tom';
	const addPendingScore = sinon.stub();
	const score = 10;
	const props = {
		id,
		name,
		addPendingScore,
		score
	};
	const renderedComponent = shallow(<AddPlayerScore { ...props } />);

	it('should be a `View`', () => {
		expect(renderedComponent.is('View')).toBe(true);
	});

	it('should have the `container` styles', () => {
		expect(renderedComponent.prop('style')).toEqual(addPlayerScoreStyles.container);
	});

	describe('and its first child', () => {
		const playerName = renderedComponent.childAt(0);

		it('should be a `Text`', () => {
			expect(playerName.is('Text')).toBe(true);
		});

		it('should have the correct name', () => {
			expect(playerName.props().children).toEqual(name);
		});

		it('should have the `playerName` styles', () => {
			expect(playerName.prop('style')).toEqual(addPlayerScoreStyles.playerName);
		});
	});

	describe('and its second child', () => {
		const playerScoreInput = renderedComponent.childAt(1);

		it('should be a `TextInput`', () => {
			expect(playerScoreInput.is('TextInput')).toBe(true);
		});

		it('should have the correct `keyboardType` prop', () => {
			expect(playerScoreInput.prop('keyboardType')).toEqual('numeric');
		});

		it('should have the correct `placeholder` prop', () => {
			expect(playerScoreInput.prop('placeholder')).toEqual('0');
		});

		it('should have the correct `value` prop', () => {
			expect(playerScoreInput.prop('value')).toEqual(score.toString());
		});

		it('should have the `playerScore` styles', () => {
			expect(playerScoreInput.prop('style')).toEqual(addPlayerScoreStyles.playerScore);
		});

		describe('when changing', () => {
			it('should call `addPendingScore`', () => {
				const newScore = 100;

				playerScoreInput.simulate('changeText', newScore);

				expect(addPendingScore.withArgs(id, newScore).calledOnce).toBe(true);
			});
		});
	});
});
