import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View } from 'react-native';

import CloseButton from './common/close-button';
import Header from './common/header';
import Leaderboard from './in-game/leaderboard';
import NavigationBar from './in-game/navigation-bar';
import { navigateTo } from '../action-creators/layout';
import { resetGame } from '../action-creators/game';
import { types } from '../constants/layout';

import styles from './styles/in-game';

export const InGame = ({ navigateTo, players, resetGame, scores }) => {
	const onClose = () => {
		resetGame();
		navigateTo(types.HOME);
	};

	const data = players.map(({ id, name }) => ({
		position: id,
		name,
		score: scores.find(el => el.id === id).score
	}));

	return (
		<View style={ styles.container }>
			<Header text="Game in Progress" />
			<CloseButton onClose={ onClose } style={ styles.closeButton } />
			<Leaderboard data={ data } />
			<NavigationBar style={ styles.navigationBar } navigateTo={ navigateTo } />
		</View>
	);
};

InGame.propTypes = {
	navigateTo: PropTypes.func.isRequired,
	players: PropTypes.array.isRequired,
	resetGame: PropTypes.func.isRequired,
	scores: PropTypes.array.isRequired
};

const mapStateToProps = ({ players, scores }) => ({
	players,
	scores
});

const mapDispatchToProps = {
	navigateTo,
	resetGame
};

export default connect(mapStateToProps, mapDispatchToProps)(InGame);
