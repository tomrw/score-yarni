import { StyleSheet } from 'react-native';

const setupProgressHeight = 30;

export default StyleSheet.create({
	container: {
		backgroundColor: '#ccc'
	},
	text: {
		color: '#a79d9d',
		fontWeight: 'bold',
		height: setupProgressHeight,
		lineHeight: setupProgressHeight,
		textAlign: 'center'
	},
	active:{
		color: '#000'
	}
});
