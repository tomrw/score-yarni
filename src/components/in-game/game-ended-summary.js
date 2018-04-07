import React from 'react';
import { Text, View } from 'react-native';

import styles from './styles/game-ended-summary';

const GameEndedSummary = () => (
	<View style={ styles.container }>
		<Text style={ styles.text }>This game has ended!</Text>
	</View>
);

export default GameEndedSummary;
