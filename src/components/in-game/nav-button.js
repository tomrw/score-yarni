import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements';

import styles from './styles/nav-button';

const NavButton = ({ active, iconType, onSelect, text }) => {
	const onPress = () => !active && onSelect();
	const activeStyle = active && styles.active;
	const icon = iconType && { name: iconType, size: 30 };

	return <Button
		icon={ icon }
		title={ text }
		onPress={ onPress }
		containerViewStyle={ styles.container }
		buttonStyle={ [ styles.button, activeStyle ] }
		textStyle={ styles.text }
	/>;
};

NavButton.propTypes = {
	active: PropTypes.bool,
	iconType: PropTypes.string,
	onSelect: PropTypes.func.isRequired,
	text: PropTypes.string.isRequired
};

export default NavButton;
