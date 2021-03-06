import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';

import AddScores from './add-scores';
import CannotAddScores from './cannot-add-scores';
import IconButton from '../common/icon-button';
import { addPendingScore, confirmAllPendingScores } from '../../action-creators/score';
import { goHomeAndResetGame } from '../../action-creators/game';

export class Scoring extends Component {
	componentDidUpdate({ ended }) {
		if (this.props.ended && !ended) {
			this.props.navigation.setParams({
				ended: this.props.ended
			});
		}
	}

	render() {
		if (this.props.ended) {
			return <CannotAddScores />;
		}

		const { addPendingScore, confirmAllPendingScores, players, pendingScores, navigation } = this.props;
		const navigateTo = navigation.navigate;
		const props = {
			addPendingScore,
			confirmAllPendingScores,
			players,
			pendingScores,
			navigateTo
		};

		return <AddScores { ...props } />;
	}
}

Scoring.navigationOptions = ({ navigation }) => {
	const gameEnded = navigation.getParam('ended');
	const iconName = gameEnded ? 'home' : 'close';
	const onClose = () => {
		if (gameEnded) {
			navigation.dispatch(goHomeAndResetGame());

			return;
		}

		Alert.alert(
			'Quit Game',
			'Are you sure you want to quit the game? It will be reset.',
			[
				{ text: 'Cancel' },
				{ text: 'OK', onPress: () => navigation.dispatch(goHomeAndResetGame()) }
			]
		);
	};

	return {
		title: 'Add Scores',
		tabBarLabel: 'Add Scores',
		tabBarIcon: <Icon name="library-add" />,
		headerLeft: null,
		headerRight: <IconButton name={ iconName } onPress={ onClose } />
	};
};

Scoring.propTypes = {
	addPendingScore: PropTypes.func.isRequired,
	confirmAllPendingScores: PropTypes.func.isRequired,
	ended: PropTypes.bool,
	navigation: PropTypes.shape({
		navigate: PropTypes.func.isRequired,
		setParams: PropTypes.func.isRequired
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
	ended: currentGame.status.ended,
	pendingScores: currentGame.scores.pendingScores,
	players: currentGame.players
});

const mapDispatchToProps = {
	addPendingScore,
	confirmAllPendingScores
};

export default connect(mapStateToProps, mapDispatchToProps)(Scoring);
