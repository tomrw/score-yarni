import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { View } from 'react-native';

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
		expect(renderedComponent.is(View)).toBe(true);
	});

	describe('and its first child', () => {
		const label = renderedComponent.childAt(0);

		it('should be a `FormLabel`', () => {
			expect(label.is('FormLabel')).toBe(true);
		});

		it('should have the correct text', () => {
			const expectedText = 'Game Score:';

			expect(label.props().children).toEqual(expectedText);
		});
	});

	describe('and its second child', () => {
		const input = renderedComponent.childAt(1);

		it('should be a `FormInput`', () => {
			expect(input.is('FormInput')).toBe(true);
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
