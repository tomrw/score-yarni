import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { connect } from 'react-redux';

import Logo from './home-page/logo';
import HomePageButton from './home-page/home-page-button';
import GameSelect from './home-page/game-select';
import { moveToAddPlayers, resumeGame } from '../action-creators/game';
import { types } from '../constants/nav';

import styles from './styles/home-page';

export const HomePage = ({ currentGame, moveToAddPlayers, navigation, resumeGame }) => {
	const onOpenSettings = () => navigation.navigate(types.SETTINGS);
	const onOpenHistory = () => navigation.navigate(types.HISTORY);

	return (
		<View style={ styles.container }>
			<View style={ styles.contentWrapper }>
				<Logo />
				<GameSelect
					currentGame={ currentGame }
					resumeGame={ resumeGame }
					onNewGame={ moveToAddPlayers } />
				<HomePageButton onPress={ onOpenSettings } text="Settings" />
				<HomePageButton onPress={ onOpenHistory } text="Past Games" />
			</View>
		</View>
	);
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
