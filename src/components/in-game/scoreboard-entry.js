import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem } from 'react-native-elements';

import styles from './styles/scoreboard-entry';

const ScoreboardEntry = ({ name, scores }) => {
	const heading = getHeading(name);
	const scoreList = getScores(scores);

	return (
		<List containerStyle={ styles.container }>
			{ heading }
			{ scoreList }
		</List>
	);
};

const getHeading = name => <ListItem title={ name } hideChevron />;

const getScores = scores => {
	let scoreSubtotal = 0;

	return scores.map((score, i) => {
		scoreSubtotal += score;

		return <ListItem
			hideChevron
			key={ i }
			title={ scoreSubtotal }
			rightTitle={ score.toString() }
		/>;
	});
};

ScoreboardEntry.propTypes = {
	name: PropTypes.string.isRequired,
	scores: PropTypes.arrayOf(PropTypes.number).isRequired
};

export default ScoreboardEntry;
