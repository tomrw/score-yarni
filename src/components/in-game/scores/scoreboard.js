import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';

import ScoreboardEntry from './scoreboard-entry';

import styles from './styles/scoreboard';

const Scoreboard = ({ scoreboardData, reverse }) => {
	return (
		<ScrollView style={ styles.container } horizontal alwaysBounceHorizontal={ false }>
			{
				scoreboardData.map(({ name, scores }, i) => (
					<ScoreboardEntry
						reverse={ reverse }
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
	reverse: PropTypes.bool,
	scoreboardData: PropTypes.arrayOf(PropTypes.shape({
		name: PropTypes.string.isRequired,
		scores: PropTypes.arrayOf(PropTypes.number).isRequired
	})).isRequired
};

export default Scoreboard;
