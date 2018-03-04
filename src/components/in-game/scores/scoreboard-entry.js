import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem } from 'react-native-elements';

import styles from './styles/scoreboard-entry';

const ScoreboardEntry = ({ name, reverse, scores }) => {
	const heading = getHeading(name);
	const scoreList = getScores(scores, reverse);

	return (
		<List containerStyle={ styles.container }>
			{ heading }
			{ scoreList }
		</List>
	);
};

const getHeading = name => <ListItem title={ name } hideChevron />;

const getScores = (scores, reverse) => {
	let scoreSubtotal = 0;
	const scoreList = scores.map((score, i) => {
		scoreSubtotal += score;

		return <ListItem
			hideChevron
			key={ i }
			title={ scoreSubtotal }
			rightTitle={ score.toString() }
		/>;
	});

	if (reverse) {
		const reversedScores = [ ...scoreList ].reverse();

		return reversedScores;
	}

	return scoreList;
};

ScoreboardEntry.propTypes = {
	name: PropTypes.string.isRequired,
	reverse: PropTypes.bool,
	scores: PropTypes.arrayOf(PropTypes.number).isRequired
};

export default ScoreboardEntry;
