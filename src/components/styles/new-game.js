import { Dimensions, StyleSheet } from 'react-native';

const { width: windowWidth } = Dimensions.get('window');

export default StyleSheet.create({
	container: {
		height: '100%',
		flex: 1,
		marginTop: 22
	},
	closeButton: {
		position: 'absolute',
		top: 0,
		right: 0,
		zIndex: 1
	},
	backButton: {
		position: 'absolute',
		top: 0,
		right: 25,
		zIndex: 2
	},
	setupProgress: {
		bottom: 0,
		left: 0,
		position: 'absolute',
		right: 0
	},
	progressBar: {
		bottom: 30,
		height: 5,
		position: 'absolute',
		width: windowWidth
	},
	gameSetup: {
		bottom: 35,
		left: 0,
		position: 'absolute',
		right: 0,
		top: 0
	}
});
