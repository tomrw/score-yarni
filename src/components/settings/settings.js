import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View } from 'react-native';

import config from './setting-config';
import SettingOptions from './setting-options';
import { changeSetting } from '../../action-creators/settings';

export const Settings = ({ changeSetting, config, settings }) => {
	const settingConfig = getSettings(config, settings);

	return (
		<View>
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

Settings.navigationOptions = {
	title: 'Settings'
};

Settings.propTypes = {
	changeSetting: PropTypes.func.isRequired,
	config: PropTypes.arrayOf(PropTypes.shape({
		description: PropTypes.string,
		text: PropTypes.string.isRequired,
		key: PropTypes.string.isRequired
	})).isRequired,
	settings: PropTypes.object.isRequired
};

const mapStateToProps = ({ settings }) => ({
	config,
	settings
});

const mapDispatchToProps = {
	changeSetting
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
