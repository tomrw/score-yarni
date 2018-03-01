import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import Header from '../common/header';
import GameOptions from './game-config/game-options';

const GameConfig = ({ gameConfig, onBack, onChange, onClose }) => {
	return (
		<View>
			<Header text="Game Config" onBack={ onBack } onClose={ onClose } />
			<GameOptions gameConfig={ gameConfig } onChange={ onChange } />
		</View>
	);
};

GameConfig.propTypes = {
	gameConfig: PropTypes.shape({
		maxGameScore: PropTypes.number.isRequired
	}),
	onBack: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired
};

export default GameConfig;
