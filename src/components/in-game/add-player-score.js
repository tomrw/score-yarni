import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'react-native-elements';

import styles from './styles/add-player-score';

const PLACEHOLDER = '0';

class AddPlayerScore extends Component {
	render() {
		const { id, name, addPendingScore, score } = this.props;
		const setScore = score => {
			const parsedScore = parseInt(score, 10);

			addPendingScore(id, parsedScore);
		};

		return (
			<ListItem
				wrapperStyle={ styles.container }
				hideChevron
				title={ name }
				textInput
				textInputKeyboardType="numeric"
				textInputPlaceholder={ PLACEHOLDER }
				textInputSelectTextOnFocus
				textInputStyle={ styles.textInputStyle }
				textInputOnChangeText={ setScore }
				textInputValue={ score.toString() }
			/>
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
