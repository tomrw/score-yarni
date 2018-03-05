import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native-elements';
import { ScrollView } from 'react-native';

import Leaderboard from './scores/leaderboard';
import Scoreboard from './scores/scoreboard';

import styles from './styles/game-summary';

const GameSummary = ({ leaderboard, players, scores, settings = {} }) => {
	const leaderboardData = getLeaderboardData(leaderboard, players);
	const scoreboardData = getScoreboardData(players, scores);
	const { reverseScoreboard } = settings;

	return (
		<ScrollView>
			<Text style={ styles.heading }>Leaderboard</Text>
			<Leaderboard leaderboardData={ leaderboardData } />
			<Text style={ styles.heading }>Scoreboard</Text>
			<Scoreboard scoreboardData={ scoreboardData } reverse={ reverseScoreboard } />
		</ScrollView>
	);
};

const getLeaderboardData = (leaderboard, players) => {
	const leaderboardData = leaderboard.map(({ id, position, score }) => {
		const { name } = players.find(el => el.id === id);

		return {
			name,
			position,
			score
		};
	});

	return leaderboardData;
};

const getScoreboardData = (players, scores) => {
	return players.map(({ id, name }) => {
		const playerScores = scores
			.filter(score => score.id === id)
			.map(score => score.score);

		return {
			name,
			scores: playerScores
		};
	});
};

GameSummary.propTypes = {
	leaderboard: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number.isRequired,
		score: PropTypes.number.isRequired
	})).isRequired,
	players: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired
	})).isRequired,
	scores: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number.isRequired,
		score: PropTypes.number.isRequired
	})).isRequired,
	settings: PropTypes.object
};

export default GameSummary;
