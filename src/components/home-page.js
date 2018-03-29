import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { connect } from 'react-redux';

import Logo from './home-page/logo';
import HomePageButton from './home-page/home-page-button';
import { moveToAddPlayers } from '../action-creators/game';
import { types } from '../constants/nav';

import styles from './styles/home-page';

export const HomePage = ({ moveToAddPlayers, navigation }) => {
	const onNewGame = () => moveToAddPlayers();
	const onOpenSettings = () => navigation.navigate(types.SETTINGS);
	const onOpenHistory = () => navigation.navigate(types.HISTORY);

	return (
		<View style={ styles.container }>
			<View style={ styles.contentWrapper }>
				<Logo />
				<HomePageButton onPress={ onNewGame } text="New Game" />
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
	moveToAddPlayers: PropTypes.func.isRequired,
	navigation: PropTypes.shape({
		navigate: PropTypes.func.isRequired
	}).isRequired
};

const mapDispatchToProps = {
	moveToAddPlayers
};

export default connect(null, mapDispatchToProps)(HomePage);
