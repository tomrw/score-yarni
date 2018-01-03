import React from 'react';
import PropTypes from 'prop-types';
import {
	Text,
	TouchableOpacity,
	View
} from 'react-native';

import styles from './styles/player';

const Player = ({ id, name, removePlayer }) => {
	const onPress = () => removePlayer(id);

	return (
		<View style={ styles.container }>
			<Text style={ styles.playerName }>{ name }</Text>
			<TouchableOpacity
				activeOpacity={ 0.8 }
				style={ styles.removePlayerContainer }
				onPress={ onPress }>
				<Text style={ styles.removePlayerText }>x</Text>
			</TouchableOpacity>
		</View>
	);
};

Player.propTypes = {
	id: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
	removePlayer: PropTypes.func.isRequired
};

export default Player;
