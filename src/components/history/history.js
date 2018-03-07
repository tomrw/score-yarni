import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List } from 'react-native-elements';
import { View } from 'react-native';

import Header from '../common/header';
import HistoryEntry from './history-entry';
import { navigateTo } from '../../action-creators/layout';
import { types } from '../../constants/layout';

export const History = ({ history, navigateTo }) => {
	const onClose = () => navigateTo(types.HOME);
	const historyData = getHistoryData(history);

	return (
		<View>
			<Header text="Past Games" onClose={ onClose } />
			<List>
				{
					historyData.map((game, i) => {
						return <HistoryEntry
							key={ i }
							players={ game.players }
						/>;
					})
				}
			</List>
		</View>
	);
};

const getHistoryData = historyData => (
	historyData.map(({ players }) => ({
		players
	}))
);

History.propTypes = {
	history: PropTypes.arrayOf(PropTypes.shape({
		config: PropTypes.object.isRequired,
		players: PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.number.isRequired,
			name: PropTypes.string.isRequired
		})).isRequired
	})).isRequired,
	navigateTo: PropTypes.func.isRequired
};

const mapStateToProps = ({ history }) => ({
	history
});

const mapDispatchToProps = {
	navigateTo
};

export default connect(mapStateToProps, mapDispatchToProps)(History);
