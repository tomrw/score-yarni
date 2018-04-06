import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { HeaderBackButton } from 'react-navigation';
import { View } from 'react-native';

import GameConfig from './new-game/game-config';
import GameSetup from './new-game/game-setup';
import ProgressBar from './common/progress-bar';
import SetupProgress from './new-game/game-setup/setup-progress';
import { changeNavLocation } from '../action-creators/status';
import { NEW_GAME_PROGRESS_STEPS, TOTAL_NEW_GAME_STEPS } from '../constants/game';
import { types } from '../constants/nav';
import {
	addPlayer,
	goHomeAndResetGame,
	moveToGameConfig,
	removePlayer,
	resetGame,
	setGameConfig,
	startGame
} from '../action-creators/game';

import styles from './styles/new-game';

const {
	COMPLETE,
	INVALID_CONFIG,
	NO_PLAYERS,
	PLAYERS_ADDED
} = NEW_GAME_PROGRESS_STEPS;

const arePlayedConfirmed = navigation => {
	const { params } = navigation.state;
	const playersConfirmed = params ? params.playersConfirmed : false;

	return playersConfirmed;
};

export class NewGame extends Component {
	constructor() {
		super();

		this.onProgress = this.onProgress.bind(this);
	}

	render() {
		const progress = this.getProgress();
		const setupView = this.getSetupView();
		const isSetupActive = this.isSetupActive();
		const isSetupCompleted = this.isSetupCompleted(isSetupActive);

		return (
			<View style={ styles.container }>
				{ setupView }
				<ProgressBar
					steps={ TOTAL_NEW_GAME_STEPS }
					progress={ progress }
					style={ styles.progressBar }
				/>
				<SetupProgress
					active={ isSetupActive }
					complete={ isSetupCompleted }
					onPress={ this.onProgress }
				/>
			</View>
		);
	}

	getProgress() {
		const { gameConfig, players } = this.props;
		const playersConfirmed = this.arePlayedConfirmed();
		let progress = NO_PLAYERS;

		if (!playersConfirmed) {
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
		const playersConfirmed = this.arePlayedConfirmed();
		let component;

		if (!playersConfirmed) {
			const { addPlayer, removePlayer, players } = this.props;
			const props = {
				addPlayer,
				removePlayer,
				players
			};

			component = <GameSetup { ...props } />;
		}
		else {
			const { gameConfig, setGameConfig: onChange } = this.props;
			const props = {
				gameConfig,
				onChange
			};

			component = <GameConfig { ...props } />;
		}

		return component;
	}

	arePlayedConfirmed() {
		const { navigation } = this.props;

		return arePlayedConfirmed(navigation);
	}

	isSetupActive() {
		const { gameConfig, players } = this.props;
		const playersConfirmed = this.arePlayedConfirmed();
		let isActive = false;

		if (!playersConfirmed) {
			isActive = players.length > 0;
		}
		else {
			isActive = gameConfig.maxGameScore > 0;
		}

		return isActive;
	}

	isSetupCompleted(isSetupActive) {
		const playersConfirmed = this.arePlayedConfirmed();
		const completed = isSetupActive && playersConfirmed;

		return completed;
	}

	onProgress() {
		const { moveToGameConfig, startGame } = this.props;
		const playersConfirmed = this.arePlayedConfirmed();

		if (!playersConfirmed) {
			moveToGameConfig();
		}
		else {
			startGame();
		}
	}
}

NewGame.navigationOptions = ({ navigation }) => {
	const playersConfirmed = arePlayedConfirmed(navigation);
	const title = playersConfirmed ? 'Game Config' : 'Add Players';
	const onBackStatus = playersConfirmed ? types.NEW_GAME : null;
	const props = {
		title: 'Back',
		tintColor: '#fff',
		onPress:() => {
			if (!playersConfirmed) {
				navigation.dispatch(goHomeAndResetGame());
			} else {
				navigation.dispatch(changeNavLocation(onBackStatus));
				navigation.goBack(null);

			}
		}
	};

	return {
		title,
		headerLeft: <HeaderBackButton { ...props } />
	};
};

NewGame.propTypes = {
	addPlayer: PropTypes.func.isRequired,
	gameConfig: PropTypes.shape({
		maxGameScore: PropTypes.number.isRequired
	}),
	navigation: PropTypes.object.isRequired,
	moveToGameConfig: PropTypes.func.isRequired,
	players: PropTypes.array.isRequired,
	removePlayer: PropTypes.func.isRequired,
	resetGame: PropTypes.func.isRequired,
	setGameConfig: PropTypes.func.isRequired,
	startGame: PropTypes.func.isRequired
};

const mapStateToProps = ({ currentGame }) => ({
	gameConfig: {
		maxGameScore: currentGame.config.maxGameScore
	},
	players: currentGame.players
});

const mapDispatchToProps = {
	addPlayer,
	moveToGameConfig,
	removePlayer,
	resetGame,
	setGameConfig,
	startGame
};

export default connect(mapStateToProps, mapDispatchToProps)(NewGame);
