import React from 'react';
import PropTypes from 'prop-types';
import { View, ViewPropTypes } from 'react-native';

import NavButton from './nav-button';
import { subTypes, types } from '../../constants/layout';

import styles from './styles/navigation-bar';

const NavigationBar = ({ activeButton, navigateTo, style }) => {
	const goTo = view => navigateTo(types.GAME_IN_PROGRESS, view);
	const onSelectLeaderboard = () => goTo(subTypes.LEADERBOARD);
	const onSelectAddScores = () => goTo(subTypes.ADD_SCORES);
	const leaderboardActive = activeButton !== subTypes.ADD_SCORES;
	const addScoresActive = activeButton === subTypes.ADD_SCORES;

	return (
		<View style={ [ styles.container, style ] }>
			<NavButton text="Leaderboard" onSelect={ onSelectLeaderboard } active={ leaderboardActive } />
			<NavButton text="Add Scores" onSelect={ onSelectAddScores } active={ addScoresActive }/>
		</View>
	);
};

NavigationBar.propTypes = {
	activeButton: PropTypes.string,
	navigateTo: PropTypes.func.isRequired,
	style: ViewPropTypes.style
};

export default NavigationBar;
