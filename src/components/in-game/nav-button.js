import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity } from 'react-native';

import styles from './styles/nav-button';

const NavButton = ({ active, onSelect, text }) => {
	const onPress = () => onSelect();
	const activeStyle = active && styles.active;
	const activeTextStyle = active && styles.activeText;

	return (
		<TouchableOpacity
			activeOpacity={ 0.8 }
			onPress={ onPress }
			style={ [ styles.container, activeStyle ] }>
			<Text style={ [ styles.text, activeTextStyle ] }>{ text }</Text>
		</TouchableOpacity>
	);
};

NavButton.propTypes = {
	active: PropTypes.bool,
	onSelect: PropTypes.func.isRequired,
	text: PropTypes.string.isRequired
};

export default NavButton;
