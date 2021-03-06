import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View } from 'react-native';

import NewPlayerForm from './game-setup/new-player-form';
import PlayerList from './game-setup/player-list';

import styles from './styles/game-setup';

const GameSetup = ({ addPlayer, players, removePlayer }) => {
	return (
		<View style={ styles.container }>
			<NewPlayerForm playerAdded={ addPlayer } />
			<ScrollView style={ styles.playerListWrapper }>
				<PlayerList playerList={ players } removePlayer={ removePlayer } />
			</ScrollView>
		</View>
	);
};

GameSetup.propTypes = {
	addPlayer: PropTypes.func.isRequired,
	players: PropTypes.array.isRequired,
	removePlayer: PropTypes.func.isRequired
};

export default GameSetup;
