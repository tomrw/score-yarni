import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View } from 'react-native';

import AddScores from './in-game/add-scores';
import GameSummary from './in-game/game-summary';
import Header from './common/header';
import NavigationBar from './in-game/navigation-bar';
import { addPendingScore, confirmAllPendingScores } from '../action-creators/score';
import { navigateTo } from '../action-creators/layout';
import { resetGame } from '../action-creators/game';
import { subTypes, types } from '../constants/layout';

import styles from './styles/in-game';

export class InGame extends Component {
	render() {
		const { navigateTo, resetGame, view } = this.props;
		const onClose = () => {
			resetGame();
			navigateTo(types.HOME);
		};
		let childView;

		if (view === subTypes.ADD_SCORES) {
			childView = this.getAddScores();
		}
		else {
			childView = this.getGameSummary();
		}

		return (
			<View style={ styles.container }>
				<Header text="Game in Progress" onClose={ onClose } />
				{ childView }
				<NavigationBar activeButton={ view }
					navigateTo={ navigateTo }
					style={ styles.navigationBar } />
			</View>
		);
	}

	getAddScores() {
		const { players, pendingScores, addPendingScore, confirmAllPendingScores, navigateTo } = this.props;
		const data = players.map(({ id, name }) => {
			const pendingScore = pendingScores.find(score => score.id === id);
			const score = pendingScore && pendingScore.score || 0;

			return {
				id,
				name,
				score
			};
		});
		const confirmScores = () => {
			confirmAllPendingScores();
			navigateTo(types.GAME_IN_PROGRESS, subTypes.LEADERBOARD);
		};
		const props = {
			addPendingScore,
			confirmScores,
			data
		};

		return <AddScores { ...props } />;
	}

	getGameSummary() {
		const { leaderboard, players, scores, settings } = this.props;
		const props = {
			leaderboard,
			players,
			scores,
			settings
		};

		return <GameSummary { ...props } />;
	}
}

InGame.propTypes = {
	addPendingScore: PropTypes.func.isRequired,
	confirmAllPendingScores: PropTypes.func.isRequired,
	leaderboard: PropTypes.array.isRequired,
	navigateTo: PropTypes.func.isRequired,
	pendingScores: PropTypes.array.isRequired,
	players: PropTypes.array.isRequired,
	scores: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number.isRequired,
		score: PropTypes.number.isRequired
	})).isRequired,
	resetGame: PropTypes.func.isRequired,
	settings: PropTypes.object.isRequired,
	view: PropTypes.string
};

const mapStateToProps = ({ currentGame, layout, settings }) => ({
	leaderboard: currentGame.leaderboard,
	pendingScores: currentGame.scores.pendingScores,
	players: currentGame.players,
	scores: currentGame.scores.scores,
	settings,
	view: layout.child
});

const mapDispatchToProps = {
	addPendingScore,
	confirmAllPendingScores,
	navigateTo,
	resetGame
};

export default connect(mapStateToProps, mapDispatchToProps)(InGame);
