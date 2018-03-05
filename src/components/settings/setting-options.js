import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem } from 'react-native-elements';

const SettingOptions = ({ config }) => {
	return (
		<List>
			{
				config.map(({ description, text }, i) => {
					return <ListItem
						key={ i }
						hideChevron
						switchButton
						switched
						title={ text }
						subtitle={ description }
					/>;
				})
			}
		</List>
	);
};

SettingOptions.propTypes = {
	config: PropTypes.arrayOf(PropTypes.shape({
		text: PropTypes.string.isRequired,
		description: PropTypes.string
	})).isRequired
};

export default SettingOptions;
