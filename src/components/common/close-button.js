import React from 'react';
import PropTypes from 'prop-types';
import {
	Text,
	TouchableOpacity,
	ViewPropTypes
} from 'react-native';

import styles from './styles/close-button';

const CloseButton = ({ onClose, style }) => {
	const onPress = () => {
		onClose();
	};

	return (
		<TouchableOpacity onPress={ onPress } style={ [ styles, style ] } >
			<Text>x</Text>
		</TouchableOpacity>
	);
};

CloseButton.propTypes = {
	onClose: PropTypes.func.isRequired,
	style: ViewPropTypes.style
};

export default CloseButton;
