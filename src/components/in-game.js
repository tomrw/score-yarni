import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';

import CloseButton from './common/close-button';
import Header from './common/header';
import Leaderboard from './in-game/leaderboard';
import NavigationBar from './in-game/navigation-bar';
import { navigateTo } from '../action-creators/layout';
import { resetGame } from '../action-creators/game';
import { subTypes, types } from '../constants/layout';

import styles from './styles/in-game';

const getView = (view, players, scores) => {
	let component;

	if (view === subTypes.ADD_SCORES) {
		component = <Text>Add scores!</Text>;
	}
	else {
		const data = players.map(({ id, name }) => ({
			position: id,
			name,
			score: scores.find(el => el.id === id).score
		}));

		component = <Leaderboard data={ data } /> ;
	}

	return component;
};

export const InGame = ({ navigateTo, players, resetGame, scores, view }) => {
	const onClose = () => {
		resetGame();
		navigateTo(types.HOME);
	};
	const childView = getView(view, players, scores);

	return (
		<View style={ styles.container }>
			<Header text="Game in Progress" />
			<CloseButton onClose={ onClose } style={ styles.closeButton } />
			{ childView }
			<NavigationBar activeButton={ view }
				navigateTo={ navigateTo }
				style={ styles.navigationBar } />
		</View>
	);
};

InGame.propTypes = {
	navigateTo: PropTypes.func.isRequired,
	players: PropTypes.array.isRequired,
	resetGame: PropTypes.func.isRequired,
	scores: PropTypes.array.isRequired,
	view: PropTypes.string
};

const mapStateToProps = ({ layout, players, scores }) => ({
	view: layout.child,
	players,
	scores
});

const mapDispatchToProps = {
	navigateTo,
	resetGame
};

export default connect(mapStateToProps, mapDispatchToProps)(InGame);
