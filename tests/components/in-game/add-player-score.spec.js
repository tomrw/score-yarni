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

	it('should be a `ListItem`', () => {
		expect(renderedComponent.is('ListItem')).toBe(true);
	});

	it('should have the `container` styles', () => {
		expect(renderedComponent.prop('wrapperStyle')).toEqual(addPlayerScoreStyles.container);
	});

	it('should have the correct `title` prop', () => {
		expect(renderedComponent.prop('title')).toEqual(name);
	});

	it('should have a `hideChevron` prop', () => {
		expect(renderedComponent.prop('hideChevron')).toBe(true);
	});

	it('should have a `textInput` prop', () => {
		expect(renderedComponent.prop('textInput')).toBe(true);
	});

	it('should have the correct `textInputKeyboardType` prop', () => {
		expect(renderedComponent.prop('textInputKeyboardType')).toEqual('numeric');
	});

	it('should have the correct `textInputPlaceholder` prop', () => {
		expect(renderedComponent.prop('textInputPlaceholder')).toEqual('0');
	});

	it('should have the correct `textInputValue` prop', () => {
		expect(renderedComponent.prop('textInputValue')).toEqual(score.toString());
	});

	describe('when the input changes', () => {
		it('should call `addPendingScore`', () => {
			const newScore = 100;

			renderedComponent.prop('textInputOnChangeText')(newScore);

			expect(addPendingScore.withArgs(id, newScore).calledOnce).toBe(true);
		});
	});
});
