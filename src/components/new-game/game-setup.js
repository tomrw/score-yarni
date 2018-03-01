import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import Header from '../common/header';
import NewPlayerForm from './game-setup/new-player-form';
import PlayerList from './game-setup/player-list';

import styles from './styles/game-setup';

const GameSetup = ({ addPlayer, onClose, players, removePlayer }) => {
	return (
		<View style={ styles.container }>
			<Header text="Add Players" onClose={ onClose } />
			<NewPlayerForm playerAdded={ addPlayer } />
			<View style={ styles.playerListWrapper }>
				<PlayerList playerList={ players } removePlayer={ removePlayer } />
			</View>
		</View>
	);
};

GameSetup.propTypes = {
	addPlayer: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
	players: PropTypes.array.isRequired,
	removePlayer: PropTypes.func.isRequired
};

export default GameSetup;
