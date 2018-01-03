import { StyleSheet } from 'react-native';

const containerHeight = 20;
const containerWidth = 20;
const arrowHeight = 20;
const arrowWidth = 3;

export default StyleSheet.create({
	container: {
		height: containerHeight,
		width: containerWidth
	},
	arrow: {
		backgroundColor: 'black',
		borderRadius: 5,
		height: arrowHeight,
		left: (containerWidth / 2) - (arrowWidth / 2),
		position: 'absolute',
		top: 0,
		width: arrowWidth
	},
	first: {
		transform: [ { rotate: '45deg' } ]
	},
	second: {
		transform: [ { rotate: '-45deg' } ]
	}
});
