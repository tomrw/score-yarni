import { StyleSheet } from 'react-native';

const homePageWrapperHeight = 200;
const homePageWrapperWidth = 200;

export default StyleSheet.create({
	container: {
		backgroundColor: 'white',
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	contentWrapper: {
		borderRadius: homePageWrapperHeight / 2,
		height: homePageWrapperHeight,
		overflow: 'hidden',
		width: homePageWrapperWidth
	}
});
