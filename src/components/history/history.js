import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';

import HistoryEntries from './history-entries';

export const History = ({ history, navigation, settings = {} }) => {
	const historyData = getHistoryData(history);

	return (
		<ScrollView>
			<HistoryEntries
				historyData={ historyData }
				navigateTo={ navigation.navigate }
				reverse={ settings.historyLatestGamesFirst } />
		</ScrollView>
	);
};

const getHistoryData = historyData => (
	historyData.map(({ players }) => ({
		players
	}))
);

History.navigationOptions = {
	title: 'Past Games'
};

History.propTypes = {
	history: PropTypes.arrayOf(PropTypes.shape({
		players: PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.number.isRequired,
			name: PropTypes.string.isRequired
		})).isRequired
	})).isRequired,
	navigation: PropTypes.shape({
		navigate: PropTypes.func.isRequired
	}).isRequired,
	settings: PropTypes.object
};

const mapStateToProps = ({ history, settings }) => ({
	history,
	settings
});

export default connect(mapStateToProps)(History);
