import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';

import HomePage from './home-page';
import NewGame from './new-game';
import { types } from '../constants/layout';

import styles from './styles/app';

export const App = ({ view }) => {
	const component = getChildView(view);

	return (
		<View style={ styles }>
			{ component }
		</View>
	);
};

const getChildView = view => {
	let component = <HomePage />;

	if (view === types.NEW_GAME || view === types.GAME_CONFIG) {
		component = <NewGame />;
	}
	else if (view === types.GAME_IN_PROGRESS) {
		return <View><Text>game in progress!</Text></View>;
	}

	return component;
};

App.propTypes = {
	view: PropTypes.string
};

const mapStateToProps = ({ layout }) => ({
	view: layout.view
});

export default connect(mapStateToProps)(App);
