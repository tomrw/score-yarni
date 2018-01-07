import React from 'react';
import { View, ViewPropTypes } from 'react-native';

import NavButton from './nav-button';

import styles from './styles/navigation-bar';

const NavigationBar = ({ style }) => {
	return (
		<View style={ [ styles.container, style ] }>
			<NavButton text="lala" />
			<NavButton text="lala 2" />
		</View>
	);
};

NavigationBar.propTypes = {
	style: ViewPropTypes.style
};

export default NavigationBar;
