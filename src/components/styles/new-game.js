import { Dimensions, StyleSheet } from 'react-native';

const { width: windowWidth } = Dimensions.get('window');
const progressBarPadding = 15;
const progressBarWidth = windowWidth - progressBarPadding * 2;

export default StyleSheet.create({
	container: {
		height: '100%'
	},
	progressBar: {
		position: 'absolute',
		bottom: 58,
		left: progressBarPadding,
		right: progressBarPadding,
		width: progressBarWidth
	}
});
