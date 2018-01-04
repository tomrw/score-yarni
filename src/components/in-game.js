import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';

import CloseButton from './common/close-button';
import Header from './common/header';
import { navigateTo } from '../action-creators/layout';
import { types } from '../constants/layout';

export const InGame = ({ navigateTo }) => {
	const onClose = () => navigateTo(types.HOME);

	return (
		<View>
			<Header text="Game in Progress" />
			<CloseButton onClose={ onClose } />
			<Text>game in progress!</Text>
		</View>
	);
};

InGame.propTypes = {
	navigateTo: PropTypes.func.isRequired
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {
	navigateTo
};

export default connect(mapStateToProps, mapDispatchToProps)(InGame);
