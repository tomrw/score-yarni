import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity } from 'react-native';

import styles from './styles/new-game-btn';

const NewGame = ({ onNewGame }) => {
	const onPress = () => {
		onNewGame();
	};

	return (
		<TouchableOpacity onPress={ onPress } style={ styles.container }>
			<Text style={ styles.text }>New Game</Text>
		</TouchableOpacity>
	);
};

NewGame.propTypes = {
	onNewGame: PropTypes.func.isRequired
};

export default NewGame;
