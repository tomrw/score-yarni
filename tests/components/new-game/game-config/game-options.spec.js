import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import GameOptions from '../../../../src/components/new-game/game-config/game-options';

describe('Given <GameOptions />', () => {
	const sandbox = sinon.sandbox.create();
	const onChange = sandbox.stub();
	const gameConfig = {
		maxGameScore: 100
	};
	const props = {
		gameConfig,
		onChange
	};
	const renderedComponent = shallow(<GameOptions { ...props } />);

	beforeEach(() => sandbox.reset());

	afterEach(() => {
		sandbox.restore();
		onChange.reset();
	});

	it('should be a `View`', () => {
		expect(renderedComponent.is('View')).toBe(true);
	});

	xit('should have a `game-options', () => {
		expect(renderedComponent.hasClass('game-options')).toBe(true);
	});

	describe('and its first child', () => {
		const label = renderedComponent.childAt(0);

		it('should be a `Text`', () => {
			expect(label.is('Text')).toBe(true);
		});

		it('should have some text', () => {
			expect(label.text()).not.toEqual('');
		});
	});

	describe('and its second child', () => {
		const input = renderedComponent.childAt(1);

		it('should be a `TextInput`', () => {
			expect(input.is('TextInput')).toBe(true);
		});

		it('should have a `keyboardType` prop', () => {
			expect(input.prop('keyboardType')).toEqual('numeric');
		});

		it('should have a placeholder value of `150`', () => {
			expect(input.prop('placeholder')).toEqual('150');
		});

		it('should have the correct value', () => {
			expect(input.prop('value')).toEqual(gameConfig.maxGameScore.toString());
		});

		describe('when it changes', () => {
			it('should trigger the `onChangeText` prop', () => {
				input.simulate('changeText', '1234');

				expect(onChange.withArgs(1234).calledOnce).toBe(true);
			});
		});
	});
});
