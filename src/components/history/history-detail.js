import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import GameSummary from '../in-game/game-summary';
import Header from '../common/header';

const HistoryDetail = ({ leaderboard, players, scores }) => {
	return (
		<View>
			<Header text="Hello!" />
			<GameSummary
				leaderboard={ leaderboard }
				players={ players }
				scores={ scores }
			/>
		</View>
	);
};

HistoryDetail.propTypes = {
	leaderboard: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number.isRequired,
		position: PropTypes.number.isRequired,
		score: PropTypes.number.isRequired
	})).isRequired,
	players: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired
	})).isRequired,
	scores: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number.isRequired,
		score: PropTypes.number.isRequired
	})).isRequired
};

export default HistoryDetail;
