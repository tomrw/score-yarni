import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { connect } from 'react-redux';

import Logo from './home-page/logo';
import NewGameButton from './home-page/new-game-button';
import { navigateTo } from '../action-creators/layout';
import { types } from '../constants/layout';

import styles from './styles/home-page';

export const HomePage = ({ navigateTo }) => {
	const onNewGame = () => navigateTo(types.NEW_GAME);

	return (
		<View style={ styles.container }>
			<View style={ styles.contentWrapper }>
				<Logo />
				<NewGameButton onNewGame={ onNewGame } />
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
