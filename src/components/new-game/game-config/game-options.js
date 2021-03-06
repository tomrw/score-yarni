import React from 'react';
import PropTypes from 'prop-types';
import { FormInput, FormLabel } from 'react-native-elements';
import { View } from 'react-native';

const DEFAULT_MAX_GAME_SCORE = 150;

const GameOptions = ({ gameConfig, onChange }) => {
	const { maxGameScore } = gameConfig;

	const onInputChange = value => {
		const maxGameScore = parseInt(value, 10);

		onChange(maxGameScore);
	};

	return (
		<View>
			<FormLabel>Game Score:</FormLabel>
			<FormInput
				keyboardType="numeric"
				onChangeText={ onInputChange }
				placeholder={ DEFAULT_MAX_GAME_SCORE.toString() }
				value={ maxGameScore.toString() } />
		</View>
	);
};

GameOptions.propTypes = {
	gameConfig: PropTypes.shape({
		maxGameScore: PropTypes.number.isRequired
	}),
	onChange: PropTypes.func.isRequired
};

export default GameOptions;
