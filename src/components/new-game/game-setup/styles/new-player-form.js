import { Dimensions, StyleSheet } from 'react-native';

const borderColor = '#b0b0b0';
const componentHeight = 40;
const height = 50;
const buttonWidth = 70;
const sidePadding = 10;
const { width: windowWidth } = Dimensions.get('window');
const formWidth = windowWidth - buttonWidth - (sidePadding * 2) - 5;

export default StyleSheet.create({
	container: {
		flexDirection: 'row',
		height,
		paddingLeft: sidePadding,
		paddingRight: sidePadding,
		paddingTop: 5
	},
	textInput: {
		backgroundColor: 'white',
		borderColor,
		borderRadius: 5,
		borderStyle: 'solid',
		borderWidth: 1,
		fontSize: 16,
		height: componentHeight,
		paddingLeft: 5,
		paddingRight: 5,
		width: formWidth
	},
	button: {
		backgroundColor: '#ccc',
		borderRadius: 5,
		flex: 1,
		height: componentHeight,
		marginLeft: 5,
		overflow: 'hidden',
		width: buttonWidth
	},
	buttonText: {
		backgroundColor: '#ccc',
		fontSize: 16,
		height: componentHeight,
		lineHeight: componentHeight,
		textAlign: 'center'
	}
});
