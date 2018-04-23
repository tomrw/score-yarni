import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'react-native-elements';
import { ScrollView, View } from 'react-native';

import AddPlayerScore from './add-player-score';
import ConfirmScores from './confirm-scores';

import styles from './styles/add-scores';

const AddScores = ({ addPendingScore, confirmAllPendingScores, navigateTo, players, pendingScores }) => {
	const data = getData(players, pendingScores);
	const confirmScores = () => {
		confirmAllPendingScores();

		navigateTo('gameInfo');
	};

	return (
		<View style={ styles.container }>
			<ScrollView style={ styles.list } alwaysBounceVertical={ false }>
				<List>
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
			</ScrollView>
			<ConfirmScores onConfirmScores={ confirmScores } />
		</View>
	);
};

const getData = (players, pendingScores) => {
	return players.map(({ id, name }) => {
		const pendingScore = pendingScores.find(score => score.id === id);
		const score = pendingScore && pendingScore.score || 0;

		return {
			id,
			name,
			score
		};
	});
};

AddScores.propTypes = {
	addPendingScore: PropTypes.func.isRequired,
	confirmAllPendingScores: PropTypes.func.isRequired,
	navigateTo: PropTypes.func.isRequired,
	pendingScores: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number.isRequired,
		score: PropTypes.number.isRequired
	})).isRequired,
	players: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired
	})).isRequired
};

export default AddScores;
