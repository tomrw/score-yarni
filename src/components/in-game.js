import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';

import CloseButton from './common/close-button';
import Header from './common/header';
import NavigationBar from './in-game/navigation-bar';
import { navigateTo } from '../action-creators/layout';
import { resetGame } from '../action-creators/game';
import { types } from '../constants/layout';

import styles from './styles/in-game';

export const InGame = ({ navigateTo, resetGame }) => {
	const onClose = () => {
		resetGame();
		navigateTo(types.HOME);
	};

	return (
		<View style={ styles.container }>
			<Header text="Game in Progress" />
			<CloseButton onClose={ onClose } style={ styles.closeButton } />
			<Text>game in progress!</Text>
			<NavigationBar style={ styles.navigationBar } />
		</View>
	);
};

InGame.propTypes = {
	navigateTo: PropTypes.func.isRequired,
	resetGame: PropTypes.func.isRequired
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {
	navigateTo,
	resetGame
};

export default connect(mapStateToProps, mapDispatchToProps)(InGame);
