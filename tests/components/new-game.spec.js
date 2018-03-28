import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

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
	const navigate = sinon.stub();
	const navigation = {
		navigate,
		state: {}
	};
	const navigationWithPlayersConfirmed = {
		navigate,
		state: {
			params: {
				playersConfirmed: true
			}
		}
	};
	const startGame = sinon.stub();
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
		navigation,
		players,
		removePlayer,
		resetGame,
		setGameConfig: onChange,
		startGame
	};
	const renderedComponent = shallow(<NewGame { ...props } />);

	it('should be a `View`', () => {
		expect(renderedComponent.is('View')).toBe(true);
	});

	it('should have the `container` styles', () => {
		expect(renderedComponent.prop('style')).toEqual(newGameStyles.container);
	});

	describe('and its navigation options', () => {
		const options = NewGame.navigationOptions({ navigation });

		it('should have the correict `title`', () => {
			const expectedTitle = 'Add Players';

			expect(options.title).toEqual(expectedTitle);
		});

		describe('when players have been confirmed', () => {
			const options = NewGame.navigationOptions({
				navigation: navigationWithPlayersConfirmed
			});

			it('should have the correict `title`', () => {
				const expectedTitle = 'Game Config';

				expect(options.title).toEqual(expectedTitle);
			});
		});
	});

	describe('and its <GameSetup />', () => {
		const setupView = renderedComponent.find(GameSetup);

		describe('when players have NOT been confirmed`', () => {
			it('should have an `addPlayer` prop', () => {
				expect(setupView.prop('addPlayer')).toEqual(addPlayer);
			});

			it('should have a `removePlayer` prop', () => {
				expect(setupView.prop('removePlayer')).toEqual(removePlayer);
			});

			it('should have a `players` prop', () => {
				expect(setupView.prop('players')).toEqual(players);
			});

			it('should have an `onClose` prop', () => {
				const expectedOnClose = renderedComponent.instance().onClose;

				expect(setupView.prop('onClose')).toEqual(expectedOnClose);
			});
		});

		describe('when players have been confirmed', () => {
			const newProps = {
				...props,
				navigation: navigationWithPlayersConfirmed
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

			it('should have an `onClose` prop', () => {
				const expectedOnClose = renderedComponent.instance().onClose;

				expect(setupView.prop('onClose')).toEqual(expectedOnClose);
			});
		});
	});

	describe('and its <ProgressBar />', () => {
		const progressBar = renderedComponent.find(ProgressBar);

		it('should have the correct `steps` prop', () => {
			expect(progressBar.prop('steps')).toEqual(3);
		});

		describe('when players have NOT been confirmed', () => {
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

		describe('when players have been confirmed', () => {
			describe('when the config is valid', () => {
				const newProps = {
					...props,
					navigation: navigationWithPlayersConfirmed
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
						navigation: navigationWithPlayersConfirmed,
						gameConfig: {
							maxGameScore: 0
						}
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

		describe('when players have NOT been confirmed', () => {
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

					expect(navigate.withArgs('GAME_CONFIG', {
						playersConfirmed: true
					}).calledOnce).toBe(true);
				});
			});
		});

		describe('when players have been confirmed', () => {
			const newProps = {
				...props,
				navigation: navigationWithPlayersConfirmed
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
					navigation: navigationWithPlayersConfirmed,
					gameConfig: {
						maxGameScore: 0
					}
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
					expect(navigate.withArgs('GAME_IN_PROGRESS').calledOnce).toBe(true);
				});
			});
		});
	});
});
