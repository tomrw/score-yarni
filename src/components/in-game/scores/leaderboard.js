import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'react-native-elements';

import LeaderboardEntry from './leaderboard-entry';

import styles from './styles/leaderboard';

const Leaderboard = ({ data }) => {
	return <List containerStyle={ styles.container }>
		{
			data.map(({ position, name, score }, i) => {
				const props = {
					name,
					position,
					score
				};

				return <LeaderboardEntry key={ i } { ...props } />;
			})
		}
	</List>;
};

Leaderboard.propTypes = {
	data: PropTypes.array.isRequired
};

export default Leaderboard;
