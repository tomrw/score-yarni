import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements';

import styles from './styles/nav-button';

const NavButton = ({ active, onSelect, text }) => {
	const onPress = () => !active && onSelect();
	const activeStyle = active && styles.active;
	const activeTextStyle = active && styles.activeText;

	return <Button
		title={ text }
		onPress={ onPress }
		containerViewStyle={ [ styles.container, activeStyle ] }
		buttonStyle={ activeStyle }
		textStyle={ activeTextStyle }
	/>;
};

NavButton.propTypes = {
	active: PropTypes.bool,
	onSelect: PropTypes.func.isRequired,
	text: PropTypes.string.isRequired
};

export default NavButton;
