import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import Header from '../../../src/components/common/header';
import GameConfig from '../../../src/components/new-game/game-config';
import GameOptions from '../../../src/components/new-game/game-config/game-options';

describe('Given <GameConfig />', () => {
	const onBack = sinon.stub();
	const onChange = sinon.stub();
	const onClose = sinon.stub();
	const gameConfig = {
		maxGameScore: 10
	};
	const props = {
		gameConfig,
		onBack,
		onChange,
		onClose
	};
	const renderedComponent = shallow(<GameConfig { ...props } />);

	it('should be a `View`', () => {
		expect(renderedComponent.is('View')).toBe(true);
	});

	describe('and its header', () => {
		const header = renderedComponent.childAt(0);

		it('should be a `Header`', () => {
			expect(header.is(Header)).toBe(true);
		});

		it('should have a `text` prop', () => {
			expect(header.prop('text')).not.toEqual('');
		});
	});

	describe('and its game options', () => {
		const gameOptions = renderedComponent.childAt(1);

		it('should be a <GameOptions />', () => {
			expect(gameOptions.is(GameOptions)).toBe(true);
		});

		it('should have a `gameConfig` prop', () => {
			expect(gameOptions.prop('gameConfig')).toEqual(gameConfig);
		});

		it('should have a `onChange` prop', () => {
			expect(gameOptions.prop('onChange')).toEqual(onChange);
		});
	});
});
