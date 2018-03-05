import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { connect } from 'react-redux';

import Logo from './home-page/logo';
import HomePageButton from './home-page/home-page-button';
import { navigateTo } from '../action-creators/layout';
import { types } from '../constants/layout';

import styles from './styles/home-page';

export const HomePage = ({ navigateTo }) => {
	const onNewGame = () => navigateTo(types.NEW_GAME);
	const onOpenSettings = () => navigateTo(types.SETTINGS);

	return (
		<View style={ styles.container }>
			<View style={ styles.contentWrapper }>
				<Logo />
				<HomePageButton onPress={ onNewGame } text="New Game" />
				<HomePageButton onPress={ onOpenSettings } text="Settings" />
			</View>
		</View>
	);
};

HomePage.propTypes = {
	navigateTo: PropTypes.func.isRequired
};

const mapDispatchToProps = {
	navigateTo
};

export default connect(null, mapDispatchToProps)(HomePage);
