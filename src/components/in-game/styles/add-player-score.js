import { Dimensions, StyleSheet } from 'react-native';

const { width: windowWidth } = Dimensions.get('window');
const sidePadding = 10;
const containerWidth = windowWidth - (sidePadding * 2);
const playerScoreWidth = 50;
const fontSize = 18;

export default StyleSheet.create({
	container: {
		flexDirection: 'row',
		height: 40,
		paddingBottom: 5,
		paddingLeft: sidePadding,
		paddingRight: sidePadding,
		width: containerWidth
	},
	playerName: {
		fontSize,
		width: containerWidth - playerScoreWidth
	},
	playerScore: {
		fontSize,
		textAlign: 'center',
		width: playerScoreWidth
	}
});
