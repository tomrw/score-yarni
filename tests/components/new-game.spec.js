import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import BackButton from '../../src/components/common/back-button';
import CloseButton from '../../src/components/common/close-button';
import GameConfig from '../../src/components/new-game/game-config';
import GameSetup from '../../src/components/new-game/game-setup';
import ProgressBar from '../../src/components/common/progress-bar';
import SetupProgress from '../../src/components/new-game/game-setup/setup-progress';
import { NewGame } from '../../src/components/new-game';

import newGameStyles from '../../src/components/styles/new-game';

describe('Given <NewGame />', () => {
	const addPlayer = sinon.stub();
	const onChange = sinon.stub();
	const removePlayer = sinon.stub();
	const resetGame = sinon.stub();
	const navigateTo = sinon.stub();
	const startGame = sinon.stub();
	const view = 'NEW_GAME';
	const players = [
		{ name: 'Player 1', id: 1 },
		{ name: 'Player 2', id: 2 }
	];
	const gameConfig = {
		maxGameScore: 10
	};
	const props = {
		addPlayer,
		gameConfig,
		navigateTo,
		players,
		removePlayer,
		resetGame,
		setGameConfig: onChange,
		startGame,
		view
	};
	const renderedComponent = shallow(<NewGame { ...props } />);

	it('should be a `View`', () => {
		expect(renderedComponent.is('View')).toBe(true);
	});

	it('should have the `container` styles', () => {
		expect(renderedComponent.prop('style')).toEqual(newGameStyles.container);
	});

	describe('and its <CloseButton />', () => {
		const closeButton = renderedComponent.find(CloseButton);
		const onClose = closeButton.prop('onClose');

		onClose();

		it('should call `navigateTo` when the `onClose` prop is triggered', () => {
			expect(navigateTo.withArgs('HOME').calledOnce).toBe(true);
		});

		it('should call `resetGame` when the `onClose` prop is triggered', () => {
			expect(resetGame.calledOnce).toBe(true);
		});
	});

	describe('and its <BackButton />', () => {
		describe('when the `view` is `NEW_GAME`', () => {
			const backButton = renderedComponent.find(BackButton);

			it('should NOT be rendered', () => {
				expect(backButton.exists()).toBe(false);
			});
		});

		describe('when the `view` is GAME_CONFIG', () => {
			const newProps = {
				...props,
				view: 'GAME_CONFIG'
			};
			const renderedComponent = shallow(<NewGame { ...newProps } />);
			const backButton = renderedComponent.find(BackButton);

			it('should be rendered', () => {
				expect(backButton.exists()).toBe(true);
			});

			it('should call `navigateTo` with `NEW_GAME` when the `onBack` prop is called', () => {
				const onBack = backButton.prop('onBack');

				onBack();

				expect(navigateTo.withArgs('NEW_GAME').calledOnce).toBe(true);
			});
		});
	});

	describe('and its <GameSetup />', () => {
		const setupView = renderedComponent.find(GameSetup);

		describe('when the `view` is set to `NEW_GAME`', () => {
			it('should have an `addPlayer` prop', () => {
				expect(setupView.prop('addPlayer')).toEqual(addPlayer);
			});

			it('should have a `removePlayer` prop', () => {
				expect(setupView.prop('removePlayer')).toEqual(removePlayer);
			});

			it('should have a `players` prop', () => {
				expect(setupView.prop('players')).toEqual(players);
			});
		});

		describe('when the `view` is set to `GAME_CONFIG`', () => {
			const newProps = {
				...props,
				view: 'GAME_CONFIG'
			};
			const renderedComponent = shallow(<NewGame { ...newProps } />);
			const setupView = renderedComponent.find(GameConfig);

			it('should exist', () => {
				expect(setupView.exists()).toBe(true);
			});

			it('should have a `gameConfig` prop', () => {
				expect(setupView.prop('gameConfig')).toEqual(gameConfig);
			});

			it('should have an `onChange` prop', () => {
				expect(setupView.prop('onChange')).toEqual(onChange);
			});
		});
	});

	describe('and its <ProgressBar />', () => {
		const progressBar = renderedComponent.find(ProgressBar);

		it('should have the correct `steps` prop', () => {
			expect(progressBar.prop('steps')).toEqual(3);
		});

		describe('when the `view` is set to `NEW_GAME`', () => {
			it('should have a `progress` prop of `zero` when there are no players', () => {
				const newProps = {
					...props,
					players: []
				};
				const renderedComponent = shallow(<NewGame { ...newProps } />);
				const progressBar = renderedComponent.find(ProgressBar);

				expect(progressBar.prop('progress')).toEqual(0);
			});

			it('should have a `progress` prop of `one` when there is more than one player', () => {
				expect(progressBar.prop('progress')).toEqual(1);
			});
		});

		describe('when the `view` is set to `GAME_CONFIG`', () => {
			describe('when the config is valid', () => {
				const newProps = {
					...props,
					view: 'GAME_CONFIG'
				};
				const renderedComponent = shallow(<NewGame { ...newProps } />);
				const progressBar = renderedComponent.find(ProgressBar);

				it('should have a `progress` prop of `three` if the game config is valid', () => {
					expect(progressBar.prop('progress')).toEqual(3);
				});
			});

			describe('when the config is NOT valid', () => {
				it('should have a `progress` prop of `two`', () => {
					const newProps = {
						...props,
						gameConfig: {
							maxGameScore: 0
						},
						view: 'GAME_CONFIG'
					};
					const renderedComponent = shallow(<NewGame { ...newProps } />);
					const progressBar = renderedComponent.find(ProgressBar);

					expect(progressBar.prop('progress')).toEqual(2);
				});
			});
		});
	});

	describe('and its <SetupProgress />', () => {
		const setupProgress = renderedComponent.find(SetupProgress);

		describe('when the `view` is set to `NEW_GAME`', () => {
			it('should have an `active/false` prop if there are no players', () => {
				const newProps = {
					...props,
					players: []
				};
				const renderedComponent = shallow(<NewGame { ...newProps } />);
				const setupProgress = renderedComponent.find(SetupProgress);

				expect(setupProgress.prop('active')).toBe(false);
			});

			it('should have an `active/true` prop if there is more than one player', () => {
				expect(setupProgress.prop('active')).toBe(true);
			});

			it('should have a `complete/false` prop', () => {
				expect(setupProgress.prop('complete')).toBe(false);
			});

			describe('when pressed', () => {
				it('should navigate to `GAME_CONFIG`', () => {
					setupProgress.simulate('press');

					expect(navigateTo.withArgs('GAME_CONFIG').calledOnce).toBe(true);
				});
			});
		});

		describe('when the `view` is set to `GAME_CONFIG`', () => {
			const newProps = {
				...props,
				view: 'GAME_CONFIG'
			};
			const renderedComponent = shallow(<NewGame { ...newProps } />);
			const setupProgress = renderedComponent.find(SetupProgress);

			it('should have an `active/true` prop if the game config is valid', () => {
				expect(setupProgress.prop('active')).toBe(true);
			});

			it('should have a `complete/true` prop if the game config is valid', () => {
				expect(setupProgress.prop('complete')).toBe(true);
			});

			describe('when the game config if NOT valid', () => {
				const newProps = {
					...props,
					gameConfig: {
						maxGameScore: 0
					},
					view: 'GAME_CONFIG'
				};
				const renderedComponent = shallow(<NewGame { ...newProps } />);
				const setupProgress = renderedComponent.find(SetupProgress);

				it('should have an `active/false` prop', () => {
					expect(setupProgress.prop('active')).toBe(false);
				});

				it('should have a `complete/false` prop', () => {
					expect(setupProgress.prop('complete')).toBe(false);
				});
			});

			describe('when pressed', () => {
				setupProgress.simulate('press');

				it('should call `startGame`', () => {
					expect(startGame.calledOnce).toBe(true);
				});

				it('should navigate to `GAME_IN_PROGRESS`', () => {
					expect(navigateTo.withArgs('GAME_IN_PROGRESS').calledOnce).toBe(true);
				});
			});
		});
	});
});
