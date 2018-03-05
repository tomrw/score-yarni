import { StyleSheet } from 'react-native';

import { height } from './navigation-bar';

export default StyleSheet.create({
	container: {
		flex: 1,
		height,
		marginLeft: 0,
		marginRight: 0,
		width: '100%'
	},
	button: {
		flexDirection: 'column'
	},
	text: {
		marginTop: 5
	},
	active: {
		backgroundColor: 'red'
	}
});
