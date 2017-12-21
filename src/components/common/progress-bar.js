import React from 'react';
import PropTypes from 'prop-types';
import { View, ViewPropTypes } from 'react-native';

import styles from './styles/progress-bar';

const calculateWidth = (progress, steps) => {
	const progressWidth = (progress / steps) * 100;
	let progressWidthWithBounds = progressWidth;

	if (isNaN(progressWidthWithBounds)) {
		progressWidthWithBounds = 100;
	}

	if (progressWidth > 100) {
		progressWidthWithBounds = 100;
	} else if (progressWidth < 0) {
		progressWidthWithBounds = 0;
	}

	return progressWidthWithBounds;
};

const ProgressBar = ({ progress, steps, style }) => {
	const progressBarWidth = calculateWidth(progress, steps);
	const barStyle = [
		styles.bar,
		{ width: `${ progressBarWidth }%` }
	];

	return (
		<View style={ [ styles.container, style ] }>
			<View style={ barStyle } />
		</View>
	);
};

ProgressBar.propTypes = {
	progress: PropTypes.number.isRequired,
	steps: PropTypes.number.isRequired,
	style: ViewPropTypes.style
};

export default ProgressBar;
