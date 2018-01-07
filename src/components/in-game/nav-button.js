import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';

import styles from './styles/nav-button';

const NavButton = ({ text }) => {
	return (
		<View style={ styles.container }>
			<Text style={ styles.text }>{ text }</Text>
		</View>
	);
};

NavButton.propTypes = {
	text: PropTypes.string.isRequired
};

export default NavButton;
