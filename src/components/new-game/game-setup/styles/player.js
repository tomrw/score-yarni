import { Dimensions, StyleSheet } from 'react-native';

const { width: windowWidth } = Dimensions.get('window');
const sidePadding = 10;
const containerWidth = windowWidth - (sidePadding * 2);
const playerRemoveButtonWidth = 30;
const playerRemoveNameMargin = 10;
const removeButtonHeight = 30;

export default StyleSheet.create({
	container: {
		flexDirection: 'row',
		paddingBottom: 5,
		paddingLeft: sidePadding,
		paddingRight: sidePadding,
		width: containerWidth
	},
	playerName: {
		fontSize: 18,
		width: containerWidth - playerRemoveButtonWidth - playerRemoveNameMargin
	},
	removePlayerContainer: {
		backgroundColor: '#ccc',
		borderRadius: 5,
		height: 30,
		marginLeft: playerRemoveNameMargin,
		overflow: 'hidden',
		width: playerRemoveButtonWidth
	},
	removePlayerText: {
		lineHeight: removeButtonHeight,
		textAlign: 'center'
	}
});
