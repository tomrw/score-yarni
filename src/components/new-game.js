import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View } from 'react-native';

import BackButton from './common/back-button';
import CloseButton from './common/close-button';
import GameConfig from './new-game/game-config';
import GameSetup from './new-game/game-setup';
import ProgressBar from './common/progress-bar';
import SetupProgress from './new-game/game-setup/setup-progress';
import { navigateTo } from '../action-creators/layout';
import { types } from '../constants/layout';
import { NEW_GAME_PROGRESS_STEPS, TOTAL_NEW_GAME_STEPS } from '../constants/game';
import {
	addPlayer,
	removePlayer,
	resetGame,
	setGameConfig
} from '../action-creators/game';

import styles from './styles/new-game';

const {
	COMPLETE,
	INVALID_CONFIG,
	NO_PLAYERS,
	PLAYERS_ADDED
} = NEW_GAME_PROGRESS_STEPS;

export class NewGame extends Component {
	constructor() {
		super();

		this.onBack = this.onBack.bind(this);
		this.onClose = this.onClose.bind(this);
		this.onProgress = this.onProgress.bind(this);
	}

	render() {
		const progress = this.getProgress();
		const setupView = this.getSetupView();
		const isSetupActive = this.isSetupActive();
		const isSetupCompleted = this.isSetupCompleted(isSetupActive);
		const hasBackButton = this.hasBackButton();
		const backButton = hasBackButton && <BackButton onBack={ this.onBack } style={ styles.backButton } />;

		return (
			<View style={ styles.container }>
				<CloseButton
					onClose={ this.onClose }
					style={ styles.closeButton } />
				{ backButton }
				{ setupView }
				<ProgressBar
					steps={ TOTAL_NEW_GAME_STEPS }
					progress={ progress }
					style={ styles.progressBar } />
				<SetupProgress
					active={ isSetupActive }
					complete={ isSetupCompleted }
					onPress={ this.onProgress }
					style={ styles.setupProgress } />
			</View>
		);
	}

	getProgress() {
		const { gameConfig, players, view } = this.props;
		let progress = NO_PLAYERS;

		if (view === types.NEW_GAME) {
			if (players.length) {
				progress = PLAYERS_ADDED;
			}
		}
		else {
			if (gameConfig.maxGameScore > 0) {
				progress = COMPLETE;
			}
			else {
				progress = INVALID_CONFIG;
			}
		}

		return progress;
	}

	getSetupView() {
		const { view } = this.props;
		let component;

		if (view === types.NEW_GAME) {
			const { addPlayer, removePlayer, players } = this.props;

			component = <GameSetup addPlayer={ addPlayer } removePlayer={ removePlayer } players={ players } />;
		}
		else {
			const { gameConfig, setGameConfig: onChange } = this.props;

			component = <GameConfig gameConfig={ gameConfig } onChange={ onChange } />;
		}

		return component;
	}

	isSetupActive() {
		const { gameConfig, players, view } = this.props;
		let isActive = false;

		if (view === types.NEW_GAME) {
			isActive = players.length > 0;
		}
		else {
			isActive = gameConfig.maxGameScore > 0;
		}

		return isActive;
	}

	isSetupCompleted(isSetupActive) {
		const { view } = this.props;
		const completed = isSetupActive && view === types.GAME_CONFIG;

		return completed;
	}

	onProgress() {
		const { navigateTo, view } = this.props;

		if (view === types.NEW_GAME) {
			navigateTo(types.GAME_CONFIG);
		}
		else {
			navigateTo(types.GAME_IN_PROGRESS);
		}
	}

	onClose() {
		const { navigateTo, resetGame } = this.props;

		navigateTo(types.HOME);
		resetGame();
	}

	hasBackButton() {
		const { view } = this.props;
		const hasBackButton = view === types.GAME_CONFIG;

		return hasBackButton;
	}

	onBack() {
		const { navigateTo } = this.props;

		navigateTo(types.NEW_GAME);
	}
}

NewGame.propTypes = {
	addPlayer: PropTypes.func.isRequired,
	gameConfig: PropTypes.shape({
		maxGameScore: PropTypes.number.isRequired
	}),
	navigateTo: PropTypes.func.isRequired,
	players: PropTypes.array.isRequired,
	removePlayer: PropTypes.func.isRequired,
	resetGame: PropTypes.func.isRequired,
	setGameConfig: PropTypes.func.isRequired,
	view: PropTypes.string.isRequired
};

const mapStateToProps = ({ game, layout, players }) => ({
	gameConfig: {
		maxGameScore: game.maxGameScore
	},
	players,
	view: layout.view
});

const mapDispatchToProps = {
	addPlayer,
	removePlayer,
	resetGame,
	navigateTo,
	setGameConfig
};

export default connect(mapStateToProps, mapDispatchToProps)(NewGame);
