import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { addNavigationHelpers, NavigationActions } from 'react-navigation';

import { addListener } from '../navigation/redux';
import AppNavigator from '../navigation/app';

export class AppWithNavigationState extends Component {
	constructor() {
		super();

		this.onBackPress = this.onBackPress.bind(this);
	}

	componentDidMount() {
		BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
	}

	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
	}

	onBackPress() {
		const { dispatch, nav } = this.props;

		if (nav.index === 0) {
			return false;
		}

		dispatch(NavigationActions.back());

		return true;
	}

	render() {
		const { dispatch, nav } = this.props;
		const navigation = addNavigationHelpers({
			dispatch,
			state: nav,
			addListener
		});

		return <AppNavigator navigation={ navigation } />;
	}
}

AppWithNavigationState.propTypes = {
	dispatch: PropTypes.func.isRequired,
	nav: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	nav: state.nav
});

export default connect(mapStateToProps)(AppWithNavigationState);
