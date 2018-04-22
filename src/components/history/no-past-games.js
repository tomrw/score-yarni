import React from 'react';
import { Text, View } from 'react-native';

import styles from './styles/no-past-games';

const NoPastGames = () => (
	<View style={ styles.container }>
		<Text style={ styles.heading }>No Past Games</Text>
		<Text style={ styles.body }>You haven't played any previous games. Play some to see them here!</Text>
	</View>
);

export default NoPastGames;
