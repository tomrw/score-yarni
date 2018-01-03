import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';

import styles from './styles/header';

const Header = ({ text }) => <Text style={ styles }>{ text }</Text>;

Header.propTypes = {
	text: PropTypes.string.isRequired
};

export default Header;
