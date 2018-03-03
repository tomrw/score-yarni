import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements';

const NewGame = ({ onNewGame }) => {
	const onPress = () => onNewGame();

	return (
		<Button
			large
			onPress={ onPress }
			title="New Game"
		/>
	);
};

NewGame.propTypes = {
	onNewGame: PropTypes.func.isRequired
};

export default NewGame;
