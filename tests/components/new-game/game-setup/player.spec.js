import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import Player from '../../../../src/components/new-game/game-setup/player';

describe('Given <Player />', () => {
	const id = 1;
	const name = 'tomrw';
	const removePlayer = sinon.spy();
	const renderedComponent = shallow(<Player id={ id } name={ name } removePlayer={ removePlayer } />);

	it('should be a `ListItem`', () => {
		expect(renderedComponent.is('ListItem')).toBe(true);
	});

	it('should have the correct `title` prop', () => {
		expect(renderedComponent.prop('title')).toEqual(name);
	});

	it('should have the correct `rightIcon` prop', () => {
		const expectedRightIcon = {
			name: 'clear'
		};

		expect(renderedComponent.prop('rightIcon')).toEqual(expectedRightIcon);
	});

	describe('when the right icon is pressed', () => {
		it('should call the `removePlayer` prop with the correct `id`', () => {
			renderedComponent.simulate('pressRightIcon');

			expect(removePlayer.withArgs(id).calledOnce).toBe(true);
		});
	});
});
