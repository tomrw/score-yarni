import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { View } from 'react-native';

import GameSelect from '../../../src/components/home-page/game-select';
import HomePageButton from '../../../src/components/home-page/home-page-button';

describe('Given <GameSelect />', () => {
	const onNewGame = sinon.stub();
	const resumeGame = sinon.stub();
	const props = {
		onNewGame,
		resumeGame
	};
	const renderedComponent = shallow(<GameSelect { ...props } />);

	it('should be a `View`', () => {
		expect(renderedComponent.is(View)).toBe(true);
	});

	describe('and its first child', () => {
		const newGameButton = renderedComponent.childAt(0);

		it('should be a <HomePageButton />', () => {
			expect(newGameButton.is(HomePageButton)).toBe(true);
		});

		it('should have an `onPress` prop', () => {
			expect(newGameButton.prop('onPress')).toEqual(onNewGame);
		});

		it('should have the correct text', () => {
			const expectedText = 'New Game';

			expect(newGameButton.prop('text')).toEqual(expectedText);
		});
	});

	describe('when NOT resuming the game', () => {
		it('should only have ONE child', () => {
			expect(renderedComponent.children()).toHaveLength(1);
		});
	});

	describe('when resuming the game', () => {
		const currentGame = {
			status: {
				location: 'NEW_GAME'
			},
			players: [
				{ id: 1, name: 'Tom' },
				{ id: 2, name: 'Fred' }
			]
		};
		const newProps = {
			...props,
			currentGame
		};
		const renderedComponent = shallow(<GameSelect { ...newProps } />);
		const resumeGameButton = renderedComponent.childAt(1);

		describe('the resume button child', () => {
			it('should be a <HomePageButton />', () => {
				expect(resumeGameButton.is(HomePageButton)).toBe(true);
			});

			it('should have the correct text', () => {
				const expectedText = 'Resume Last Game';

				expect(resumeGameButton.prop('text')).toEqual(expectedText);
			});

			it('should have an `onPress` prop', () => {
				expect(resumeGameButton.prop('onPress')).toEqual(resumeGame);
			});
		});
	});

	describe('when resuming the game with no players', () => {
		const currentGame = {
			status: {
				location: 'NEW_GAME'
			}
		};
		const newProps = {
			...props,
			currentGame
		};
		const renderedComponent = shallow(<GameSelect { ...newProps } />);

		it('should NOT be rendered', () => {
			expect(renderedComponent.children()).toHaveLength(1);
		});
	});

	describe('when resuming the game with no location', () => {
		const currentGame = {
			players: [
				{ id: 1, name: 'Tom' },
				{ id: 2, name: 'Fred' }
			]
		};
		const newProps = {
			...props,
			currentGame
		};
		const renderedComponent = shallow(<GameSelect { ...newProps } />);

		it('should NOT be rendered', () => {
			expect(renderedComponent.children()).toHaveLength(1);
		});
	});
});
