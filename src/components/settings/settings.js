import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View } from 'react-native';

import config from './setting-config';
import Header from '../common/header';
import SettingOptions from './setting-options';
import { changeSetting } from '../../action-creators/settings';
import { navigateTo } from '../../action-creators/layout';
import { types } from '../../constants/layout';

export const Settings = ({ changeSetting, config, navigateTo, settings }) => {
	const onClose = () => navigateTo(types.HOME);
	const settingConfig = getSettings(config, settings);

	return (
		<View>
			<Header text="Settings" onClose={ onClose } />
			<SettingOptions changeSetting={ changeSetting } config={ settingConfig } />
		</View>
	);
};

const getSettings = (config, settings) => (
	config.map(setting => ({
		...setting,
		value: settings[ setting.key ]
	}))
);

Settings.propTypes = {
	changeSetting: PropTypes.func.isRequired,
	config: PropTypes.arrayOf(PropTypes.shape({
		description: PropTypes.string,
		text: PropTypes.string.isRequired,
		key: PropTypes.string.isRequired
	})).isRequired,
	navigateTo: PropTypes.func.isRequired,
	settings: PropTypes.object.isRequired
};

const mapStateToProps = ({ settings }) => ({
	config,
	settings
});

const mapDispatchToProps = {
	changeSetting,
	navigateTo
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
