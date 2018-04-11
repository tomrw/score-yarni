import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';

import CloseButton from '../common/close-button';
import GameSummary from './game-summary';
import { goHomeAndResetGame } from '../../action-creators/game';

export const GameInfo = ({ ended, leaderboard, players, scores, settings, winners }) => {
	const props = {
		ended,
		leaderboard,
		players,
		scores,
		settings,
		winners
	};

	return <GameSummary { ...props } />;
};

GameInfo.navigationOptions = ({ navigation }) => {
	const onClose = () => {
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
		headerRight: <CloseButton onClose={ onClose } />
	};
};

GameInfo.propTypes = {
	ended: PropTypes.bool,
	leaderboard: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number.isRequired,
		position: PropTypes.number.isRequired,
		score: PropTypes.number.isRequired
	})).isRequired,
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
