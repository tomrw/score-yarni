import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';

import styles from './styles/game-ended-summary';

const GameEndedSummary = ({ winners }) => {
	const winnerText = getWinnerText(winners);

	return (
		<View style={ styles.container }>
			<Text style={ styles.text }>{ winnerText }</Text>
		</View>
	);
};

const getWinnerText = winners => {
	let text = `${ winners[0] } wins!`;

	if (winners.length === 2) {
		text = `${ winners[0] } & ${ winners[1] } win!`;
	} else if (winners.length > 2) {
		const lastWinner = winners[ winners.length - 1];

		text = `${ winners.slice(0, -1).join(', ') } & ${ lastWinner } win!`;
	}

	return text;
};

GameEndedSummary.propTypes = {
	winners: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default GameEndedSummary;
