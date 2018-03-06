import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View } from 'react-native';

import Header from '../common/header';
import { navigateTo } from '../../action-creators/layout';
import { types } from '../../constants/layout';

export const History = ({ navigateTo }) => {
	const onClose = () => navigateTo(types.HOME);

	return (
		<View>
			<Header text="Past Games" onClose={ onClose } />
		</View>
	);
};

History.propTypes = {
	navigateTo: PropTypes.func.isRequired
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {
	navigateTo
};

export default connect(mapStateToProps, mapDispatchToProps)(History);
