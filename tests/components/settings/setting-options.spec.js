import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { List, ListItem } from 'react-native-elements';

import SettingOptions from '../../../src/components/settings/setting-options';

describe('Given <SettingOptions />', () => {
	const changeSetting = sinon.stub();
	const config = [
		{ text: 'Hello!', description: 'there', key: 'a', value: true },
		{ text: 'Howdy!', description: 'partner', key: 'b', value: false }
	];
	const props = {
		changeSetting,
		config
	};
	const renderedComponent = shallow(<SettingOptions { ...props } />);

	afterEach(() => changeSetting.reset());

	it('should be a `List`', () => {
		expect(renderedComponent.is(List)).toBe(true);
	});

	it('should have the expected number of children', () => {
		expect(renderedComponent.children()).toHaveLength(config.length);
	});

	describe('when rendering the settings', () => {
		config.forEach((item, i) => {
			describe(`for the config at index ${ i }`, () => {
				const entry = renderedComponent.childAt(i);

				it('should be a `ListItem`', () => {
					expect(entry.is(ListItem)).toBe(true);
				});

				it('should have the correct `key`', () => {
					const expectedKey = i.toString();

					expect(entry.key()).toEqual(expectedKey);
				});

				it('should have the correct `text` prop', () => {
					expect(entry.prop('title')).toEqual(item.text);
				});

				it('should have the correct `description` prop', () => {
					expect(entry.prop('subtitle')).toEqual(item.description);
				});

				it('should have a `switchButton` prop', () => {
					expect(entry.prop('switchButton')).toBe(true);
				});

				it('should have the correct `switched` prop', () => {
					expect(entry.prop('switched')).toBe(item.value);
				});

				it('should have a `hideChevron` prop', () => {
					expect(entry.prop('hideChevron')).toBe(true);
				});

				describe('when pressed', () => {
					it('should call `changeSetting`', () => {
						entry.simulate('switch', !item.value);

						expect(changeSetting.withArgs(item.key, !item.value).calledOnce).toBe(true);
					});
				});
			});
		});
	});
});
