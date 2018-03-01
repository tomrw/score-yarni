import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'react-native-elements';

const Player = ({ id, name, removePlayer }) => {
	const onPress = () => removePlayer(id);
	const rightIcon = { name: 'clear' };

	return (
		<ListItem
			title={ name }
			rightIcon={ rightIcon }
			onPressRightIcon={ onPress }
		/>
	);
};

Player.propTypes = {
	id: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
	removePlayer: PropTypes.func.isRequired
};

export default Player;
