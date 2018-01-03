import React from 'react';
import PropTypes from 'prop-types';
import {
	TouchableOpacity,
	View,
	ViewPropTypes
} from 'react-native';

import styles from './styles/back-button';

const BackButton = ({ onBack, style }) => {
	const onPress = () => onBack();

	return (
		<TouchableOpacity
			activeOpacity={ 0.8 }
			onPress={ onPress }
			style={ [ styles.container, style ] }>
			<View style={ [ styles.arrow, styles.first ] } />
			<View style={ [ styles.arrow, styles.second ] } />
			<View style={ styles.line } />
		</TouchableOpacity>
	);
};

BackButton.propTypes = {
	onBack: PropTypes.func.isRequired,
	style: ViewPropTypes.style
};

export default BackButton;
