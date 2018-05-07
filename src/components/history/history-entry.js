import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'react-native-elements';

const HistoryEntry = ({ onPress, players }) => {
	const title = getTitle(players);
	const leftIcon = { name: 'people' };

	return (
		<ListItem
			title={ title }
			titleNumberOfLines={ 0 }
			leftIcon={ leftIcon }
			onPress={ onPress } />
	);
};

const getTitle = players => {
	const playerNames = players.map(({ name }) => name);
	let title;

	if (players.length === 1) {
		title = players[0].name;
	}
	else if (players.length > 4) {
		const formattedPlayers = playerNames.slice(0, 4);

		title = `${ formattedPlayers.join(', ') } and others`;
	}
	else {
		const lastPlayerName = playerNames.pop();

		title = `${ playerNames.join(', ') } and ${ lastPlayerName }`;
	}

	return title;
};

HistoryEntry.propTypes = {
	onPress: PropTypes.func.isRequired,
	players: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired
	})).isRequired
};

export default HistoryEntry;
