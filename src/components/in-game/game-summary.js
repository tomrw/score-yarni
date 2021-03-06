import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native-elements';
import { ScrollView } from 'react-native';

import GameEndedSummary from './game-ended-summary';
import Leaderboard from './scores/leaderboard';
import Scoreboard from './scores/scoreboard';

import styles from './styles/game-summary';

const GameSummary = ({ ended, leaderboard, players, scores, settings = {}, winners }) => {
	const leaderboardData = getLeaderboardData(leaderboard, players);
	const scoreboardData = getScoreboardData(players, scores);
	const { reverseScoreboard } = settings;
	const gameEnded = ended ? <GameEndedSummary winners={ winners } /> : null;

	return (
		<ScrollView>
			{ gameEnded }
			<Text style={ styles.heading }>Leaderboard</Text>
			<Leaderboard leaderboardData={ leaderboardData } />
			<Text style={ styles.heading }>Scoreboard</Text>
			<Scoreboard scoreboardData={ scoreboardData } reverse={ reverseScoreboard } />
		</ScrollView>
	);
};

const getLeaderboardData = (leaderboard, players) => {
	const leaderboardData = leaderboard.map(({ position, scores }) => {
		const scoresWithNames = getScoresForPosition(scores, players);

		return {
			position,
			scores: scoresWithNames
		};
	});

	return leaderboardData;
};

const getScoresForPosition = (scores, players) => {
	const scoresWithNames = scores.map(({ id, score }) => {
		const { name } = players.find(el => el.id === id);

		return {
			name,
			score
		};
	});

	return scoresWithNames;
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
	ended: PropTypes.bool,
	leaderboard: PropTypes.arrayOf(PropTypes.shape({
		position: PropTypes.number.isRequired,
		scores: PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.number.isRequired,
			score: PropTypes.number.isRequired
		})).isRequired
	})).isRequired,
	players: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired
	})).isRequired,
	scores: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number.isRequired,
		score: PropTypes.number.isRequired
	})).isRequired,
	settings: PropTypes.object,
	winners: PropTypes.arrayOf(PropTypes.string)
};

export default GameSummary;
