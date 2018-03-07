import React from 'react';
import PropTypes from 'prop-types';
import { Header as Heading } from 'react-native-elements';

import BackButton from './back-button';
import CloseButton from './close-button';

import styles from './styles/header';

const Header = ({ onBack, onClose, text }) => {
	const backButton = onBack && <BackButton onBack={ onBack } />;
	const closeButton = onClose && <CloseButton onClose={ onClose } />;
	const centerHeading = {
		text,
		style: styles.heading
	};
	const statusBarProps = {
		backgroundColor: '#476DC5',
		translucent: true
	};

	return <Heading
		statusBarProps={ statusBarProps }
		leftComponent={ backButton }
		centerComponent={ centerHeading }
		rightComponent={ closeButton }
	/>;
};

Header.propTypes = {
	onBack: PropTypes.func,
	onClose: PropTypes.func,
	text: PropTypes.string.isRequired
};

export default Header;
