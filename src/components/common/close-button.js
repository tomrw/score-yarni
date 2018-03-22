import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements';

const CloseButton = ({ onClose }) => {
	const onPress = () => onClose();
	const icon = {
		name: 'close',
		size: 25
	};
	const style = {
		marginRight: 0,
		paddingRight: 0
	};

	return <Button
		borderRadius={ 20 }
		containerViewStyle={ style }
		buttonStyle={ style }
		transparent
		icon={ icon }
		onPress={ onPress } />;
};

CloseButton.propTypes = {
	onClose: PropTypes.func.isRequired
};

export default CloseButton;
