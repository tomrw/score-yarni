import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import NewGameButton from '../../../src/components/home-page/new-game-button';

describe('Given <NewGameButton />', () => {
	const onNewGame = sinon.spy();
	const renderedComponent = shallow(<NewGameButton onNewGame={ onNewGame } />);

	it('should be a `Button`', () => {
		expect(renderedComponent.is('Button')).toBe(true);
	});

	it('should have the correct `title` prop', () => {
		const expectedText = 'New Game';

		expect(renderedComponent.prop('title')).toEqual(expectedText);
	});

	it('should have a `large` prop', () => {
		expect(renderedComponent.prop('large')).toBe(true);
	});

	it('should call the `onNewGame` prop when clicked', () => {
		renderedComponent.simulate('press');

		expect(onNewGame.calledOnce).toBe(true);
	});
});
