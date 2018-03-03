import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';

import ScoreboardEntry from './scoreboard-entry';

import styles from './styles/scoreboard';

const Scoreboard = ({ scoreboardData }) => {
	return (
		<ScrollView style={ styles.container } horizontal>
			{
				scoreboardData.map(({ name, scores }, i) => (
					<ScoreboardEntry
						key={ i }
						name={ name }
						scores={ scores }
					/>
				))
			}
		</ScrollView>
	);
};

Scoreboard.propTypes = {
	scoreboardData: PropTypes.arrayOf(PropTypes.shape({
		name: PropTypes.string.isRequired,
		scores: PropTypes.arrayOf(PropTypes.number).isRequired
	})).isRequired
};

export default Scoreboard;
