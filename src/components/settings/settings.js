import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View } from 'react-native';

import config from './setting-config';
import Header from '../common/header';
import SettingOptions from './setting-options';
import { navigateTo } from '../../action-creators/layout';
import { types } from '../../constants/layout';

export const Settings = ({ navigateTo }) => {
	const onClose = () => navigateTo(types.HOME);

	return (
		<View>
			<Header text="Settings" onClose={ onClose } />
			<SettingOptions config={ config } />
		</View>
	);
};

Settings.propTypes = {
	navigateTo: PropTypes.func.isRequired
};

const mapDispatchToProps = {
	navigateTo
};

export default connect(null, mapDispatchToProps)(Settings);
