import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity } from 'react-native';

import styles from './styles/nav-button';

const NavButton = ({ onSelect, text }) => {
	const onPress = () => onSelect();

	return (
		<TouchableOpacity
			activeOpacity={ 0.8 }
			onPress={ onPress }
			style={ styles.container }>
			<Text style={ styles.text }>{ text }</Text>
		</TouchableOpacity>
	);
};

NavButton.propTypes = {
	onSelect: PropTypes.func.isRequired,
	text: PropTypes.string.isRequired
};

export default NavButton;
