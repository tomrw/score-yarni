import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'react-native-elements';
import { Text } from 'react-native';

import styles from './styles/leaderboard-entry';

const LeaderboardEntry = ({ name, position, score }) => {
	const leftIcon = <Text style={ styles.position }>{ position }</Text>;
	const rightIcon = <Text>{ score }</Text>;

	return <ListItem
		wrapperStyle={ styles.container }
		leftIcon={ leftIcon }
		rightIcon={ rightIcon }
		title={ name } />;
};

LeaderboardEntry.propTypes = {
	name: PropTypes.string.isRequired,
	position: PropTypes.number.isRequired,
	score: PropTypes.number.isRequired
};

export default LeaderboardEntry;
