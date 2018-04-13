import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';

import GameSummary from '../in-game/game-summary';

export const HistoryDetail = ({ history, navigation }) => {
	const entryId = getEntryId(navigation);
	const historyEntry = history[ entryId ];
	const {
		leaderboard,
		players,
		scores,
		winners
	} = historyEntry;

	return (
		<ScrollView>
			<GameSummary
				leaderboard={ leaderboard }
				players={ players }
				scores={ scores }
				ended
				winners={ winners }
			/>
		</ScrollView>
	);
};

const getEntryId = navigation => {
	const { params } = navigation.state;
	const entryId = params ? params.entryId : null;

	return entryId;
};

HistoryDetail.navigationOptions = {
	title: 'Hello!'
};

HistoryDetail.propTypes = {
	navigation: PropTypes.shape({
		state: PropTypes.shape({
			params: PropTypes.shape({
				entryId: PropTypes.number.isRequired
			}).isRequired
		}).isRequired
	}).isRequired,
	history: PropTypes.arrayOf(PropTypes.shape({
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
	})).isRequired
};

const mapStateToProps = ({ history }) => ({
	history
});

export default connect(mapStateToProps)(HistoryDetail);
