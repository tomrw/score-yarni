import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';

import IconButton from '../common/icon-button';
import GameSummary from './game-summary';
import { goHomeAndResetGame } from '../../action-creators/game';

export class GameInfo extends Component {
	componentDidUpdate({ ended }) {
		if (this.props.ended && !ended) {
			this.props.navigation.setParams({
				ended: this.props.ended
			});
		}
	}

	render() {
		return <GameSummary { ...this.props } />;
	}
}

GameInfo.navigationOptions = ({ navigation }) => {
	const gameEnded = navigation.getParam('ended');
	const iconName = gameEnded ? 'home' : 'close';
	const onClose = () => {
		if (gameEnded) {
			navigation.dispatch(goHomeAndResetGame());

			return;
		}

		Alert.alert(
			'Quit Game',
			'Are you sure you want to quit the game? It will be reset.',
			[
				{ text: 'Cancel' },
				{ text: 'OK', onPress: () => navigation.dispatch(goHomeAndResetGame()) }
			]
		);
	};

	return {
		title: 'Leaderboard',
		tabBarIcon: <Icon name="format-list-numbered" />,
		headerLeft: null,
		headerRight: <IconButton name={ iconName } onPress={ onClose } />
	};
};

GameInfo.propTypes = {
	ended: PropTypes.bool,
	leaderboard: PropTypes.arrayOf(PropTypes.shape({
		position: PropTypes.number.isRequired,
		scores: PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.number.isRequired,
			score: PropTypes.number.isRequired
		})).isRequired
	})).isRequired,
	navigation: PropTypes.shape({
		dispatch: PropTypes.func.isRequired,
		setParams: PropTypes.func.isRequired
	}).isRequired,
	players: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired
	})).isRequired,
	scores: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number.isRequired,
		score: PropTypes.number.isRequired
	})).isRequired,
	settings: PropTypes.object,
	winners: PropTypes.arrayOf(PropTypes.string)
};

const mapStateToProps = ({ currentGame, settings }) => ({
	ended: currentGame.status.ended,
	leaderboard: currentGame.leaderboard,
	scores: currentGame.scores.scores,
	players: currentGame.players,
	settings,
	winners: currentGame.status.winners
});

export default connect(mapStateToProps)(GameInfo);
