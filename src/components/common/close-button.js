import React from 'react';
import PropTypes from 'prop-types';
import {
	View,
	TouchableOpacity,
	ViewPropTypes
} from 'react-native';

import styles from './styles/close-button';

const CloseButton = ({ onClose, style }) => {
	const onPress = () => onClose();

	return (
		<TouchableOpacity
			activeOpacity={ 0.8 }
			onPress={ onPress }
			style={ [ styles.container, style ] } >
			<View style={ [ styles.arrow, styles.first ] } />
			<View style={ [ styles.arrow, styles.second ] } />
		</TouchableOpacity>
	);
};

CloseButton.propTypes = {
	onClose: PropTypes.func.isRequired,
	style: ViewPropTypes.style
};

export default CloseButton;
