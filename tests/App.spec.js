import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';

import App from '../App';

describe('Given <App />', () => {
	it('renders correctly', () => {
		const tree = shallow(<App />);

		expect(tree.exists()).toBe(true);
	});
});
