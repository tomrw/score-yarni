import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, View } from 'react-native';

import AddPlayerScore from './add-player-score';
import ConfirmScores from './confirm-scores';

const AddScores = ({ addPendingScore, data, confirmScores }) => {
	return (
		<View>
			<FlatList
				data={ data }
				renderItem={ ({ item }) => {
					return <AddPlayerScore
						id={ item.id }
						name={ item.name }
						addPendingScore={ addPendingScore }
						score={ item.score } />;
				} }
				keyExtractor={ (item, index) => index } />
			<ConfirmScores onConfirmScores={ confirmScores } />
		</View>
	);
};

AddScores.propTypes = {
	addPendingScore: PropTypes.func.isRequired,
	confirmScores: PropTypes.func.isRequired,
	data: PropTypes.array.isRequired
};

export default AddScores;
