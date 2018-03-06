import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View } from 'react-native';

import History from './history/history';
import HomePage from './home-page';
import InGame from './in-game';
import NewGame from './new-game';
import Settings from './settings/settings';
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
		component = <InGame />;
	}
	else if (view === types.SETTINGS) {
		component = <Settings />;
	}
	else if (view === types.HISTORY) {
		component = <History />;
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
