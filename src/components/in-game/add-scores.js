import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Icon, List } from 'react-native-elements';
import { View } from 'react-native';

import AddPlayerScore from './add-player-score';
import ConfirmScores from './confirm-scores';
import CloseButton from '../common/close-button';
import { addPendingScore, confirmAllPendingScores } from '../../action-creators/score';
import { goHomeAndResetGame } from '../../action-creators/game';

import styles from './styles/add-scores';

export const AddScores = ({ addPendingScore, confirmAllPendingScores, navigation, players, pendingScores }) => {
	const data = getData(players, pendingScores);
	const confirmScores = () => {
		confirmAllPendingScores();

		navigation.navigate('gameInfo');
	};

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

AddScores.navigationOptions = ({ navigation }) => {
	const onClose = () => {
		navigation.dispatch(goHomeAndResetGame());
	};

	return {
		title: 'Add Scores',
		tabBarLabel: 'Add Scores',
		tabBarIcon: <Icon name="library-add" />,
		headerLeft: null,
		headerRight: <CloseButton onClose={ onClose } />
	};
};

AddScores.propTypes = {
	addPendingScore: PropTypes.func.isRequired,
	confirmAllPendingScores: PropTypes.func.isRequired,
	navigation: PropTypes.shape({
		navigate: PropTypes.func.isRequired
	}).isRequired,
	pendingScores: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number.isRequired,
		score: PropTypes.number.isRequired
	})).isRequired,
	players: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired
	})).isRequired
};

const mapStateToProps = ({ currentGame }) => ({
	pendingScores: currentGame.scores.pendingScores,
	players: currentGame.players
});

const mapDispatchToProps = {
	addPendingScore,
	confirmAllPendingScores
};

export default connect(mapStateToProps, mapDispatchToProps)(AddScores);
