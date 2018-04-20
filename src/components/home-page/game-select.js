import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import HomePageButton from './home-page-button';

const GameSelect = ({ currentGame, onNewGame, resumeGame }) => {
	let resumeButton = null;

	if (canResumeGame(currentGame)) {
		resumeButton = <HomePageButton onPress={ resumeGame } text="Resume Last Game" />;
	}

	return (
		<View>
			<HomePageButton onPress={ onNewGame } text="New Game" />
			{ resumeButton }
		</View>
	);
};

const canResumeGame = currentGame => {
	if (!currentGame) {
		return false;
	}

	const { players, status } = currentGame;
	const canResume = status && status.location && players && players.length;

	return canResume;
};

GameSelect.propTypes = {
	currentGame: PropTypes.object,
	onNewGame: PropTypes.func.isRequired,
	resumeGame: PropTypes.func.isRequired
};

export default GameSelect;
