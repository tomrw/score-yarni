import { Dimensions, StyleSheet } from 'react-native';

const { width: windowWidth } = Dimensions.get('window');

const playerRemoveButtonWidth = 20;
const playerRemoveNameMargin = 10;

export default StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		paddingLeft: 10
	},
	playerName: {
		paddingRight: 10,
		width: windowWidth - playerRemoveButtonWidth - playerRemoveNameMargin
	},
	removePlayerContainer: {
		backgroundColor: '#ccc',
		width: playerRemoveButtonWidth
	},
	removePlayerText: {
		textAlign: 'center'
	}
});
