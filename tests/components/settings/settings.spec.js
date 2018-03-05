import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import Header from '../../../src/components/common/header';
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
		expect(renderedComponent.is('View')).toBe(true);
	});

	describe('and its first child', () => {
		const header = renderedComponent.childAt(0);

		it('should be a `Header`', () => {
			expect(header.is(Header)).toBe(true);
		});

		it('should have a `text` prop', () => {
			const expectedText = 'Settings';

			expect(header.prop('text')).toEqual(expectedText);
		});

		describe('when the `onClose` prop is called', () => {
			const onClose = header.prop('onClose');

			onClose();

			it('should call `navigateTo` when the `onClose` prop is triggered', () => {
				expect(navigateTo.withArgs('HOME').calledOnce).toBe(true);
			});
		});
	});

	describe('and its second child', () => {
		const settingOptions = renderedComponent.childAt(1);

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
