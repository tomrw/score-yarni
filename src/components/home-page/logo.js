import React from 'react';
import { Text } from 'react-native-elements';
import { View } from 'react-native';

import styles from './styles/logo';

const Logo = () => (
	<View style={ styles.container }>
		<Text h1 style={ styles.text }>Yarni!</Text>
	</View>
);

export default Logo;
