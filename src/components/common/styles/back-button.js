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
		height: arrowHeight / 2,
		left: '20%',
		position: 'absolute',
		width: arrowWidth
	},
	first: {
		top: 1,
		transform: [ { rotate: '45deg' } ]
	},
	second: {
		bottom: 1,
		transform: [ { rotate: '-45deg' } ]
	},
	line: {
		backgroundColor: 'black',
		borderRadius: 5,
		height: arrowWidth,
		marginTop: -(arrowWidth / 2),
		position: 'absolute',
		top: '50%',
		width: containerWidth
	}
});

