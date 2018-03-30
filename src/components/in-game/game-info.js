import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';

import CloseButton from '../common/close-button';
import GameSummary from './game-summary';
import { goHomeAndResetGame } from '../../action-creators/game';

export const GameInfo = ({ leaderboard, players, scores, settings }) => {
	const props = {
		leaderboard,
		players,
		scores,
		settings
	};

	return <GameSummary { ...props } />;
};

GameInfo.navigationOptions = ({ navigation }) => {
	const onClose = () => {
		navigation.dispatch(goHomeAndResetGame());
	};

	return {
		title: 'Leaderboard',
		tabBarIcon: <Icon name="format-list-numbered" />,
		headerLeft: null,
		headerRight: <CloseButton onClose={ onClose } />
	};
};

GameInfo.propTypes = {
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
	settings: PropTypes.object
};

const mapStateToProps = ({ currentGame, settings }) => ({
	leaderboard: currentGame.leaderboard,
	scores: currentGame.scores.scores,
	players: currentGame.players,
	settings
});

export default connect(mapStateToProps)(GameInfo);
