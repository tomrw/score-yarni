import React from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';

import LeaderboardEntry from './leaderboard-entry';

const Leaderboard = ({ data }) => {
	return (
		<FlatList
			data={ data }
			renderItem={ ({ item }) =>
				<LeaderboardEntry
					position={ item.position }
					name={ item.name }
					score={ item.score } />
			}
			keyExtractor={ (item, index) => index } />
	);
};

Leaderboard.propTypes = {
	data: PropTypes.array.isRequired
};

export default Leaderboard;
