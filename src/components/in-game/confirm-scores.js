import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements';

import styles from './styles/confirm-scores';

const ConfirmScores = ({ onConfirmScores }) => {
	return (
		<Button
			onPress={ onConfirmScores }
			containerViewStyle={ styles.container }
			title="Add Scores" />
	);
};

ConfirmScores.propTypes = {
	onConfirmScores: PropTypes.func.isRequired
};

export default ConfirmScores;
