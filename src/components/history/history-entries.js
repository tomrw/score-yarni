import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'react-native-elements';

import HistoryEntry from './history-entry';
import { types } from '../../constants/nav';

const HistoryEntries = ({ historyData, navigateTo }) => {
	return (
		<List>
			{
				historyData.map((game, i) => {
					const onPress = () => navigateTo(types.HISTORY_DETAIL, { entryId: i });

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
	navigateTo: PropTypes.func.isRequired
};

export default HistoryEntries;
