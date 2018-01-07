import { StyleSheet } from 'react-native';

import { height } from './navigation-bar';

export default StyleSheet.create({
	container: {
		alignItems: 'center',
		backgroundColor: 'red',
		flex: 1,
		height
	},
	text: {
		height,
		lineHeight: height
	}
});
