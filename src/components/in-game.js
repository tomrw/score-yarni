import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View } from 'react-native';

import AddScores from './in-game/add-scores';
import CloseButton from './common/close-button';
import Header from './common/header';
import Leaderboard from './in-game/leaderboard';
import NavigationBar from './in-game/navigation-bar';
import { addPendingScore, confirmAllPendingScores } from '../action-creators/score';
import { navigateTo } from '../action-creators/layout';
import { resetGame } from '../action-creators/game';
import { subTypes, types } from '../constants/layout';

import styles from './styles/in-game';

const getView = (view, players, leaderboard, pendingScores, addPendingScore, confirmAllPendingScores, navigateTo) => {
	let component;

	if (view === subTypes.ADD_SCORES) {
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

		component = <AddScores { ...props } />;
	}
	else {
		const data = leaderboard.map(({ id, position, score }) => {
			const { name } = players.find(el => el.id === id);

			return {
				name,
				position,
				score
			};
		});

		component = <Leaderboard data={ data } /> ;
	}

	return component;
};

export const InGame = ({ addPendingScore, confirmAllPendingScores, navigateTo, players, resetGame, leaderboard, pendingScores, view }) => {
	const onClose = () => {
		resetGame();
		navigateTo(types.HOME);
	};
	const childView = getView(view, players, leaderboard, pendingScores, addPendingScore, confirmAllPendingScores, navigateTo);

	return (
		<View style={ styles.container }>
			<Header text="Game in Progress" />
			<CloseButton onClose={ onClose } style={ styles.closeButton } />
			{ childView }
			<NavigationBar activeButton={ view }
				navigateTo={ navigateTo }
				style={ styles.navigationBar } />
		</View>
	);
};

InGame.propTypes = {
	addPendingScore: PropTypes.func.isRequired,
	confirmAllPendingScores: PropTypes.func.isRequired,
	leaderboard: PropTypes.array.isRequired,
	navigateTo: PropTypes.func.isRequired,
	pendingScores: PropTypes.array.isRequired,
	players: PropTypes.array.isRequired,
	resetGame: PropTypes.func.isRequired,
	view: PropTypes.string
};

const mapStateToProps = ({ layout, leaderboard, players, scores }) => ({
	leaderboard,
	pendingScores: scores.pendingScores,
	players,
	view: layout.child
});

const mapDispatchToProps = {
	addPendingScore,
	confirmAllPendingScores,
	navigateTo,
	resetGame
};

export default connect(mapStateToProps, mapDispatchToProps)(InGame);
