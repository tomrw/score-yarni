import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements';

import styles from './styles/setup-progress';

const SetupProgress = ({ active, complete, onPress }) => {
	const text = complete ? 'Start' : 'Next';
	const onSetupPress = () => active && onPress();

	return <Button
		containerViewStyle={ styles.container }
		disabled={ !active }
		disabledTextStyle={ styles.disabled }
		onPress={ onSetupPress }
		title={ text.toUpperCase() } />;
};

SetupProgress.propTypes = {
	active: PropTypes.bool,
	complete: PropTypes.bool,
	onPress: PropTypes.func.isRequired
};

export default SetupProgress;
