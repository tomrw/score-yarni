import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import Player from '../../../../src/components/new-game/game-setup/player';
import playerStyles from '../../../../src/components/new-game/game-setup/styles/player';

describe('Given <Player />', () => {
	const id = 1;
	const name = 'tomrw';
	const removePlayer = sinon.spy();
	const renderedComponent = shallow(<Player id={ id } name={ name } removePlayer={ removePlayer } />);

	it('should be a `View`', () => {
		expect(renderedComponent.is('View')).toBe(true);
	});

	it('should have the `player` styles', () => {
		const style = renderedComponent.prop('style');

		expect(style).toEqual(playerStyles.container);
	});

	describe('and its first child', () => {
		const playerName = renderedComponent.childAt(0);

		it('should display the players name', () => {
			expect(playerName.props().children).toEqual(name);
		});

		it('should have the `player-name` styles', () => {
			const style = playerName.prop('style');

			expect(style).toEqual(playerStyles.playerName);
		});
	});

	describe('and its second child', () => {
		const removePlayerButton = renderedComponent.childAt(1);

		it('should be a `TouchableOpacity`', () => {
			expect(removePlayerButton.is('TouchableOpacity')).toBe(true);
		});

		it('should have the `remove-player-container` styles', () => {
			const style = removePlayerButton.prop('style');

			expect(style).toEqual(playerStyles.removePlayerContainer);
		});

		describe('and its text', () => {
			const text = removePlayerButton.childAt(0);

			it('should have a `Text` child', () => {
				expect(text.is('Text')).toBe(true);
			});

			it('should have the correct text', () => {
				expect(text.props().children).toEqual('x');
			});

			it('should have the `remove-player-text` styles', () => {
				const style = text.prop('style');

				expect(style).toEqual(playerStyles.removePlayerText);
			});
		});

		describe('when pressed', () => {
			it('should call its `removePlayer` prop with the correct `id`', () => {
				removePlayerButton.simulate('press');

				expect(removePlayer.withArgs(id).calledOnce).toBe(true);
			});
		});
	});
});
