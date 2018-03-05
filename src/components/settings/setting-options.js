import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem } from 'react-native-elements';

const SettingOptions = ({ changeSetting, config }) => {
	return (
		<List>
			{
				config.map(({ description, key, text, value }, i) => {
					const onSwitch = switched => changeSetting(key, switched);

					return <ListItem
						key={ i }
						hideChevron
						switchButton
						switched={ value }
						onSwitch={ onSwitch }
						title={ text }
						subtitle={ description }
					/>;
				})
			}
		</List>
	);
};

SettingOptions.propTypes = {
	changeSetting: PropTypes.func.isRequired,
	config: PropTypes.arrayOf(PropTypes.shape({
		description: PropTypes.string,
		key: PropTypes.string.isRequired,
		text: PropTypes.string.isRequired,
		value: PropTypes.any
	})).isRequired
};

export default SettingOptions;
