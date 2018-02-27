import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements';

const ConfirmScores = ({ onConfirmScores }) => {
	return (
		<Button
			onPress={ onConfirmScores }
			title="Add Scores" />
	);
};

ConfirmScores.propTypes = {
	onConfirmScores: PropTypes.func.isRequired
};

export default ConfirmScores;
