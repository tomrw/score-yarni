import React from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';

import Player from './player';

const PlayerList = ({ playerList, removePlayer }) => {
	return (
		<FlatList
			data={ playerList }
			renderItem = { ({ item }) =>
				<Player id={ item.id }
					name={ item.name }
					removePlayer={ removePlayer } />
			}
			keyExtractor={ (item, index) => index } />
	);
};

PlayerList.propTypes = {
	playerList: PropTypes.array.isRequired,
	removePlayer: PropTypes.func.isRequired
};

export default PlayerList;
