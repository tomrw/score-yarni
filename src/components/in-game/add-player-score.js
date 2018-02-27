import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, TextInput, View } from 'react-native';

import styles from './styles/add-player-score';

const PLACEHOLDER = '0';

class AddPlayerScore extends Component {
	constructor({ score }) {
		super();

		this.state = {
			score
		};
	}

	render() {
		const { id, name, addPendingScore } = this.props;
		const setScore = score => {
			this.setState({ score }, () => {
				const parsedScore = parseInt(score, 10);

				addPendingScore(id, parsedScore);
			});
		};

		return (
			<View style={ styles.container }>
				<Text style={ styles.playerName }>{ name }</Text>
				<TextInput
					onChangeText={ setScore }
					keyboardType="numeric"
					placeholder={ PLACEHOLDER }
					style={ styles.playerScore }
					value={ this.state.score.toString() } />
			</View>
		);
	}
}

AddPlayerScore.propTypes = {
	id: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
	addPendingScore: PropTypes.func.isRequired,
	score: PropTypes.number.isRequired
};

export default AddPlayerScore;
