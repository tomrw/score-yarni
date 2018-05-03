import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert, ScrollView } from 'react-native';

import GameSummary from '../in-game/game-summary';
import IconButton from '../common/icon-button';
import { removeGameFromHistory } from '../../action-creators/history';

export const HistoryDetail = ({ history, navigation }) => {
	const entryId = getEntryId(navigation);
	const historyEntry = history[ entryId ];

	if (!historyEntry) {
		return null;
	}

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

HistoryDetail.navigationOptions = ({ navigation }) => {
	const confirmRemoval = () => {
		const entryId = navigation.getParam('entryId');

		navigation.dispatch(removeGameFromHistory(entryId));
		navigation.goBack(null);
	};
	const onRemove = () => {
		Alert.alert(
			'Remove Game',
			'Are you sure you want to remove this game? It will be removed from history.',
			[
				{ text: 'Cancel' },
				{ text: 'OK', onPress: () => confirmRemoval() }
			]
		);
	};

	return {
		title: 'Hello!',
		headerRight: <IconButton name="delete" onPress={ onRemove } />
	};
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
		winners: PropTypes.arrayOf(PropTypes.string).isRequired
	})).isRequired
};

const mapStateToProps = ({ history }) => ({
	history
});

export default connect(mapStateToProps)(HistoryDetail);
