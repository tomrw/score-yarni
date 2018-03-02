import { StyleSheet } from 'react-native';

import { height } from './navigation-bar';

export default StyleSheet.create({
	container: {
		flex: 1,
		height,
		marginLeft: 0,
		marginRight: 0
	},
	text: {
		height,
		lineHeight: height
	},
	active: {
		backgroundColor: 'red'
	},
	activeText: {
		color: 'white'
	}
});
