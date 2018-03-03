import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'react-native-elements';

import LeaderboardEntry from './leaderboard-entry';

import styles from './styles/leaderboard';

const Leaderboard = ({ leaderboardData }) => {
	return <List containerStyle={ styles.container }>
		{
			leaderboardData.map(({ position, name, score }, i) => {
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
	leaderboardData: PropTypes.arrayOf(PropTypes.shape({
		name: PropTypes.string.isRequired,
		position: PropTypes.number.isRequired,
		score: PropTypes.number.isRequired
	})).isRequired
};

export default Leaderboard;
