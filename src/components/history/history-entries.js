import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'react-native-elements';

import HistoryEntry from './history-entry';
import { types } from '../../constants/nav';

const HistoryEntries = ({ historyData, navigateTo, reverse }) => {
	const entries = reverse ? historyData.reverse() : historyData;

	return (
		<List>
			{
				entries.map((game, i) => {
					const entryId = reverse ? entries.length - i - 1 : i ;
					const onPress = () => navigateTo(types.HISTORY_DETAIL, { entryId });

					return <HistoryEntry
						key={ i }
						onPress={ onPress }
						players={ game.players }
					/>;
				})
			}
		</List>
	);
};

HistoryEntries.propTypes = {
	historyData: PropTypes.arrayOf(PropTypes.shape({
		players: PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.number.isRequired,
			name: PropTypes.string.isRequired
		})).isRequired
	})).isRequired,
	navigateTo: PropTypes.func.isRequired,
	reverse: PropTypes.bool
};

export default HistoryEntries;
