import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements';

import styles from './styles/home-page-button';

const HomePageButton = ({ text, onPress }) => {
	const onButtonPress = () => onPress();

	return (
		<Button
			large
			borderRadius={ 5 }
			containerViewStyle={ styles.container }
			onPress={ onButtonPress }
			title={ text }
		/>
	);
};

HomePageButton.propTypes = {
	onPress: PropTypes.func.isRequired,
	text: PropTypes.string.isRequired
};

export default HomePageButton;
