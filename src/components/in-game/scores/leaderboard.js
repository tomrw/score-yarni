import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'react-native-elements';

import LeaderboardEntry from './leaderboard-entry';

import styles from './styles/leaderboard';

const Leaderboard = ({ leaderboardData }) => {
	return (
		<List containerStyle={ styles.container }>
			{
				leaderboardData.map(({ position, scores }) => {
					return getEntriesForPosition(position, scores);
				})
			}
		</List>
	);
};

const getEntriesForPosition = (position, scores) => {
	return scores.reduce((list, { name, score }, i) => {
		const key = `${ position }-${ i } `;
		const props = {
			key,
			name,
			position,
			score
		};
		const leaderboardEntry = <LeaderboardEntry { ...props } />;

		list.push(leaderboardEntry);

		return list;
	}, []);
};

Leaderboard.propTypes = {
	leaderboardData: PropTypes.arrayOf(PropTypes.shape({
		position: PropTypes.number.isRequired,
		scores: PropTypes.arrayOf(PropTypes.shape({
			name: PropTypes.string.isRequired,
			score: PropTypes.number.isRequired
		})).isRequired
	})).isRequired
};

export default Leaderboard;
