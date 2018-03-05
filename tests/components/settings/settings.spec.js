import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import Header from '../../../src/components/common/header';
import SettingOptions from '../../../src/components/settings/setting-options';
import SettingConfig from '../../../src/components/settings/setting-config';
import { Settings } from '../../../src/components/settings/settings';

describe('Given <Settings />', () => {
	const navigateTo = sinon.stub();
	const props = {
		navigateTo
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
			expect(settingOptions.prop('config')).toEqual(SettingConfig);
		});
	});
});
