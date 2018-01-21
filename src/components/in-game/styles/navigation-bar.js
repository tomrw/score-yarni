import { StyleSheet } from 'react-native';

export const height = 50;

export default StyleSheet.create({
	container: {
		backgroundColor: 'orange',
		flexDirection: 'row',
		height,
		width: '100%'
	},
	button: {
		backgroundColor: 'red',
		height
	}
});
