import React from 'react';
import PropTypes from 'prop-types';
import {
	Text,
	TouchableOpacity,
	ViewPropTypes
} from 'react-native';

import styles from './styles/setup-progress';

const SetupProgress = ({ active, complete, onPress, style }) => {
	const text = complete ? 'Start' : 'Next';
	const activeStyle = active && styles.active;
	const onSetupPress = () => active && onPress();

	return (
		<TouchableOpacity
			onPress={ onSetupPress }
			style={ [ styles.container, style ] }>
			<Text style={ [ styles.text, activeStyle ] }>{ text.toUpperCase() }</Text>
		</TouchableOpacity>
	);
};

SetupProgress.propTypes = {
	active: PropTypes.bool,
	complete: PropTypes.bool,
	onPress: PropTypes.func.isRequired,
	style: ViewPropTypes.style
};

export default SetupProgress;
