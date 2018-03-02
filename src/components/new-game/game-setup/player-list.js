import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'react-native-elements';

import Player from './player';

import styles from './styles/player-list';

const PlayerList = ({ playerList, removePlayer }) => {
	if (playerList.length === 0) {
		return null;
	}

	return (
		<List containerStyle={ styles.container }>
			{
				playerList.map(({ id, name }, i) => {
					const props = {
						id,
						name,
						removePlayer
					};

					return <Player key={ i } { ...props } />;
				})
			}
		</List>
	);
};

PlayerList.propTypes = {
	playerList: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired
	})).isRequired,
	removePlayer: PropTypes.func.isRequired
};

export default PlayerList;
