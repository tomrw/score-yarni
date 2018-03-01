import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements';

const CloseButton = ({ onClose }) => {
	const onPress = () => onClose();

	return <Icon
		name="close"
		color="#fff"
		underlayColor={ 'rgba(0,0,0,0.5)' }
		onPress={ onPress }
	/>;
};

CloseButton.propTypes = {
	onClose: PropTypes.func.isRequired
};

export default CloseButton;
