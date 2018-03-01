import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'react-native-elements';
import { View } from 'react-native';

import AddPlayerScore from './add-player-score';
import ConfirmScores from './confirm-scores';

import styles from './styles/add-scores';

const AddScores = ({ addPendingScore, data, confirmScores }) => {
	return (
		<View>
			<List containerStyle={ styles.container }>
				{
					data.map(({ id, name, score }, i) => {
						const props = {
							addPendingScore,
							id,
							name,
							score
						};

						return <AddPlayerScore key={ i } { ...props } />;
					})
				}
			</List>
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
