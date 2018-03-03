import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import ScoreboardEntry from './scoreboard-entry';

import styles from './styles/scoreboard';

const Scoreboard = ({ scoreboardData }) => {
	return (
		<View style={ styles.container }>
			{
				scoreboardData.map(({ name, scores }, i) => (
					<ScoreboardEntry
						key={ i }
						name={ name }
						scores={ scores }
					/>
				))
			}
		</View>
	);
};

Scoreboard.propTypes = {
	scoreboardData: PropTypes.arrayOf(PropTypes.shape({
		name: PropTypes.string.isRequired,
		scores: PropTypes.arrayOf(PropTypes.number).isRequired
	})).isRequired
};

export default Scoreboard;
