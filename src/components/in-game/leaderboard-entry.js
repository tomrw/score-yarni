import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';

const LeaderboardEntry = ({ position, name, score }) => {
	return <Text>{ position } { name } { score }</Text>;
};

LeaderboardEntry.propTypes = {
	name: PropTypes.string.isRequired,
	position: PropTypes.number.isRequired,
	score: PropTypes.number.isRequired
};

export default LeaderboardEntry;
