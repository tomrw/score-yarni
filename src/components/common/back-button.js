import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, ViewPropTypes } from 'react-native';

import styles from './styles/back-button';

const BackButton = ({ onBack, style }) => {
	const onPress = () => onBack();

	return (
		<TouchableOpacity
			onPress={ onPress }
			style={ [ styles, style ] }/>
	);
};

BackButton.propTypes = {
	onBack: PropTypes.func.isRequired,
	style: ViewPropTypes.style
};

export default BackButton;
