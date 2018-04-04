import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { connect } from 'react-redux';

import Logo from './home-page/logo';
import HomePageButton from './home-page/home-page-button';
import { moveToAddPlayers, resumeGame } from '../action-creators/game';
import { types } from '../constants/nav';

import styles from './styles/home-page';

export const HomePage = ({ currentGame, moveToAddPlayers, navigation, resumeGame }) => {
	const onNewGame = () => moveToAddPlayers();
	const onOpenSettings = () => navigation.navigate(types.SETTINGS);
	const onOpenHistory = () => navigation.navigate(types.HISTORY);
	let resumeButton = null;

	if (canResumeGame(currentGame)) {
		const onResumeGame = () => resumeGame();

		resumeButton = <HomePageButton onPress={ onResumeGame } text="Resume Last Game" />;
	}

	return (
		<View style={ styles.container }>
			<View style={ styles.contentWrapper }>
				<Logo />
				<HomePageButton onPress={ onNewGame } text="New Game" />
				{ resumeButton }
				<HomePageButton onPress={ onOpenSettings } text="Settings" />
				<HomePageButton onPress={ onOpenHistory } text="Past Games" />
			</View>
		</View>
	);
};

const canResumeGame = currentGame => {
	if (!currentGame) {
		return false;
	}

	const { players, status } = currentGame;
	const canResume = status && status.location && players && players.length;

	return canResume;
};

HomePage.navigationOptions = {
	header: null
};

HomePage.propTypes = {
	currentGame: PropTypes.object,
	moveToAddPlayers: PropTypes.func.isRequired,
	navigation: PropTypes.shape({
		navigate: PropTypes.func.isRequired
	}).isRequired,
	resumeGame: PropTypes.func.isRequired
};

const mapStateToProps = ({ currentGame }) => ({
	currentGame
});

const mapDispatchToProps = {
	moveToAddPlayers,
	resumeGame
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
