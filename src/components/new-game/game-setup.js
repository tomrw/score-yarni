import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';

import NewPlayerForm from './game-setup/new-player-form';
import PlayerList from './game-setup/player-list';

import styles from './styles/game-setup';

const GameSetup = ({ addPlayer, removePlayer, players }) => {
	return (
		<View style={ styles.container }>
			<Text style={ styles.header }>Start a new game...</Text>
			<NewPlayerForm playerAdded={ addPlayer } />
			<View style={ styles.playerListWrapper }>
				<PlayerList playerList={ players } removePlayer={ removePlayer } />
			</View>
		</View>
	);
};

GameSetup.propTypes = {
	addPlayer: PropTypes.func.isRequired,
	players: PropTypes.array.isRequired,
	removePlayer: PropTypes.func.isRequired
};

export default GameSetup;
