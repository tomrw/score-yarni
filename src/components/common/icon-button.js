import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements';

const IconButton = ({ name, onPress }) => {
	const icon = {
		name,
		size: 25
	};
	const style = {
		marginRight: 0,
		paddingRight: 0
	};

	return <Button
		borderRadius={ 20 }
		buttonStyle={ style }
		containerViewStyle={ style }
		icon={ icon }
		onPress={ onPress }
		transparent />;
};

IconButton.propTypes = {
	name: PropTypes.string.isRequired,
	onPress: PropTypes.func.isRequired
};

export default IconButton;
