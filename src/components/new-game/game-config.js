import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import GameOptions from './game-config/game-options';

const GameConfig = ({ gameConfig, onChange }) => {
	return (
		<View>
			<GameOptions gameConfig={ gameConfig } onChange={ onChange } />
		</View>
	);
};

GameConfig.propTypes = {
	gameConfig: PropTypes.shape({
		maxGameScore: PropTypes.number.isRequired
	}),
	onChange: PropTypes.func.isRequired
};

export default GameConfig;
