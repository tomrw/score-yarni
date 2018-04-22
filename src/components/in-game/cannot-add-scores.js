import React from 'react';
import { Text, View } from 'react-native';

import styles from './styles/cannot-add-scores';

const CannotAddScores = () => (
	<View style={ styles.container }>
		<Text style={ styles.heading }>The game has ended</Text>
		<Text style={ styles.body }>The game has ended so you cannot add any new scores</Text>
	</View>
);

export default CannotAddScores;
