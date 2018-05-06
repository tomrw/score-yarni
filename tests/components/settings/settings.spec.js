import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { View } from 'react-native';

import SettingOptions from '../../../src/components/settings/setting-options';
import { Settings } from '../../../src/components/settings/settings';

describe('Given <Settings />', () => {
	const changeSetting = sinon.stub();
	const config1 = { key: 'a', text: 'foo' };
	const config2 = { key: 'b', text: 'bar' };
	const config = [ config1, config2 ];
	const navigateTo = sinon.stub();
	const settings = {
		a: 'hello',
		b: 'there'
	};
	const props = {
		changeSetting,
		config,
		navigateTo,
		settings
	};
	const renderedComponent = shallow(<Settings { ...props } />);

	it('should be a `View`', () => {
		expect(renderedComponent.is(View)).toBe(true);
	});

	describe('and its navigation options', () => {
		const options = Settings.navigationOptions;

		it('should have the correct `title`', () => {
			const expectedTitle = 'Settings';

			expect(options.title).toEqual(expectedTitle);
		});
	});

	describe('and its first child', () => {
		const settingOptions = renderedComponent.childAt(0);

		it('should be a `SettingOptions`', () => {
			expect(settingOptions.is(SettingOptions)).toBe(true);
		});

		it('should have a `config` prop', () => {
			const expectedConfig = [
				{ ...config1, value: settings[ config1.key ] },
				{ ...config2, value: settings[ config2.key ] }
			];

			expect(settingOptions.prop('config')).toEqual(expectedConfig);
		});

		it('should have a `changeSetting` prop', () => {
			expect(settingOptions.prop('changeSetting')).toEqual(changeSetting);
		});
	});
});
