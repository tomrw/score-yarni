import React from 'react';
import { View, ViewPropTypes } from 'react-native';

import NavButton from './nav-button';

import styles from './styles/navigation-bar';

const NavigationBar = ({ style }) => {
	const onSelect = () => console.log('select!');

	return (
		<View style={ [ styles.container, style ] }>
			<NavButton text="lala" onSelect={ onSelect } active />
			<NavButton text="lala 2" onSelect={ onSelect } />
		</View>
	);
};

NavigationBar.propTypes = {
	style: ViewPropTypes.style
};

export default NavigationBar;
