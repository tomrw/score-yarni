import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import NewPlayerForm from '../../../../src/components/new-game/game-setup/new-player-form';

describe('Given <NewPlayerForm />', () => {
	const sandbox = sinon.sandbox.create();
	const playerAdded = sandbox.stub();
	const renderedComponent = shallow(<NewPlayerForm playerAdded={ playerAdded } />);

	beforeEach(() => sandbox.reset());

	afterEach(() => {
		sandbox.restore();
		playerAdded.reset();
	});

	it('should be a `View`', () => {
		expect(renderedComponent.is('View')).toBe(true);
	});

	describe('and its first child', () => {
		const playerInput = renderedComponent.childAt(0);

		it('should be a `TextInput`', () => {
			expect(playerInput.is('TextInput')).toBe(true);
		});

		it('should have the correct placeholder text', () => {
			const expectedPlaceholder = 'Enter player name...';

			expect(playerInput.prop('placeholder')).toEqual(expectedPlaceholder);
		});

		it('should have an `autoFocus` prop', () => {
			expect(playerInput.prop('autoFocus')).toBe(true);
		});

		it('should have an `autoCorrect/false` prop', () => {
			expect(playerInput.prop('autoCorrect')).toBe(false);
		});

		it('should have an `blurOnSubmit/false` prop', () => {
			expect(playerInput.prop('blurOnSubmit')).toBe(false);
		});
	});

	describe('and its second child', () => {
		const inputButton = renderedComponent.childAt(1);

		it('should be a `TouchableOpacity`', () => {
			expect(inputButton.is('TouchableOpacity')).toBe(true);
		});

		it('should have the expected text', () => {
			const text = inputButton.childAt(0);

			expect(text.props().children).toEqual('Add');
		});
	});

	describe('when the add player button is interacted with', () => {
		const inputText = renderedComponent.childAt(0);
		const inputButton = renderedComponent.childAt(1);
		const name = 'tomrw';

		it('should call the `playerAdded` prop with the players name', () => {
			inputText.simulate('changeText', name);
			inputButton.simulate('press');

			expect(playerAdded.withArgs(name).calledOnce).toBe(true);
		});

		it('should clear the input', () => {
			inputText.simulate('changeText', name);
			inputButton.simulate('press');

			expect(inputText.prop('value')).toEqual('');
		});

		it('should NOT call the `playerAdded` prop if no player name is entered', () => {
			inputButton.simulate('press');

			expect(playerAdded.notCalled).toBe(true);
		});

		it('should NOT call the `playerAdded` prop if only whitespace is entered', () => {
			const name = '    ';

			inputText.simulate('changeText', name);
			inputButton.simulate('press');

			expect(playerAdded.notCalled).toBe(true);
		});
	});
});
