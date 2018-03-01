import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'react-native-elements';

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
			<ListItem
				wrapperStyle={ styles.container }
				hideChevron
				title={ name }
				textInput
				textInputKeyboardType="numeric"
				textInputPlaceholder={ PLACEHOLDER }
				textInputOnChangeText={ setScore }
				textInputValue={ this.state.score.toString() }
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
