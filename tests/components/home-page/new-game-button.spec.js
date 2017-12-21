import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import NewGameButton from '../../../src/components/home-page/new-game-button';
import newGameButtonStyles from '../../../src/components/home-page/styles/new-game-btn';

describe('Given <NewGameButton />', () => {
	const onNewGame = sinon.spy();
	const renderedComponent = shallow(<NewGameButton onNewGame={ onNewGame } />);

	it('should be a `TouchableOpacity`', () => {
		expect(renderedComponent.is('TouchableOpacity')).toBe(true);
	});

	it('should have the `new-game` styles', () => {
		const style = renderedComponent.prop('style');

		expect(style).toEqual(newGameButtonStyles.container);
	});

	it('should call the `onNewGame` prop when clicked', () => {
		renderedComponent.simulate('press');

		expect(onNewGame.calledOnce).toBe(true);
	});

	describe('and its first child', () => {
		const text = renderedComponent.childAt(0);

		it('should be a `Text`', () => {
			expect(text.is('Text')).toBe(true);
		});

		it('should have the `correct` styles', () => {
			const style = text.prop('style');

			expect(style).toEqual(newGameButtonStyles.text);
		});
	});
});
