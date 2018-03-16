import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View } from 'react-native';

import HistoryDetail from './history-detail';
import HistoryEntries from './history-entries';
import { navigateTo } from '../../action-creators/layout';

export const History = ({ history, navigation }) => {
	const { navigate: navigateTo } = navigation;
	const entryId = getEntryId(navigation);
	const historyView = getHistoryView(entryId, history, navigateTo);

	return (
		<View>
			{ historyView }
		</View>
	);
};

const getEntryId = navigation => {
	const { params } = navigation.state;
	const entryId = params ? params.entryId : null;

	return entryId;
};

const getHistoryView = (entryId, history, navigateTo) => {
	let component;

	if (entryId !== null) {
		const props = { ...history[entryId] };

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

const getHistoryData = historyData => (
	historyData.map(({ players }) => ({
		players
	}))
);

History.navigationOptions = ({ navigation }) => {
	const entryId = getEntryId(navigation);
	const title = entryId === null ? 'Past Games' : 'Hello!';

	return {
		title
	};
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
	}).isRequired
};

const mapStateToProps = ({ history }) => ({
	history
});

const mapDispatchToProps = {
	navigateTo
};

export default connect(mapStateToProps, mapDispatchToProps)(History);
