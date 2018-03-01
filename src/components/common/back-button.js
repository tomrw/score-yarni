import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements';

const BackButton = ({ onBack }) => {
	const onPress = () => onBack();

	return <Icon
		name="chevron-left"
		color="#fff"
		underlayColor={ 'rgba(0,0,0,0.5)' }
		onPress={ onPress }
	/>;
};

BackButton.propTypes = {
	onBack: PropTypes.func.isRequired
};

export default BackButton;
