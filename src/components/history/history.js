import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View } from 'react-native';

import HistoryDetail from './history-detail';
import HistoryEntries from './history-entries';
import { navigateTo } from '../../action-creators/layout';
import { subTypes } from '../../constants/layout';

export const History = ({ history, navigation, view }) => {
	const { navigate: navigateTo } = navigation;
	const historyView = getHistoryView(view, history, navigateTo);

	return (
		<View>
			{ historyView }
		</View>
	);
};

const getHistoryData = historyData => (
	historyData.map(({ players }) => ({
		players
	}))
);

const getHistoryView = (view, history, navigateTo) => {
	let component;

	if (view === subTypes.HISTORY_DETAIL) {
		const props = { ...history[0] };

		component = <HistoryDetail { ...props } />;
	}
	else {
		const historyData = getHistoryData(history);

		component = <HistoryEntries
			historyData={ historyData }
			navigateTo={ navigateTo }
		/>;
	}

	return component;
};

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
	view: PropTypes.string
};

const mapStateToProps = ({ history }) => ({
	history
});

const mapDispatchToProps = {
	navigateTo
};

export default connect(mapStateToProps, mapDispatchToProps)(History);
