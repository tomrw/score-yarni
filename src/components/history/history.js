import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View } from 'react-native';

import Header from '../common/header';
import HistoryDetail from './history-detail';
import HistoryEntries from './history-entries';
import { navigateTo } from '../../action-creators/layout';
import { types, subTypes } from '../../constants/layout';

export const History = ({ history, navigateTo, view }) => {
	const onClose = () => navigateTo(types.HOME);
	const historyView = getHistoryView(view, history, navigateTo);

	return (
		<View>
			<Header text="Past Games" onClose={ onClose } />
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

History.propTypes = {
	history: PropTypes.arrayOf(PropTypes.shape({
		players: PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.number.isRequired,
			name: PropTypes.string.isRequired
		})).isRequired
	})).isRequired,
	navigateTo: PropTypes.func.isRequired,
	view: PropTypes.string
};

const mapStateToProps = ({ history, layout }) => ({
	history,
	view: layout.child
});

const mapDispatchToProps = {
	navigateTo
};

export default connect(mapStateToProps, mapDispatchToProps)(History);
