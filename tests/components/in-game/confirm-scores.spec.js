import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import ConfirmScores from '../../../src/components/in-game/confirm-scores';
import confirmScoreStyles from '../../../src/components/in-game/styles/confirm-scores';

describe('Given <ConfirmScores />', () => {
	const onConfirmScores = sinon.stub();
	const props = {
		onConfirmScores
	};
	const renderedComponent = shallow(<ConfirmScores { ...props } />);

	it('should be a `Button`', () => {
		expect(renderedComponent.is('Button')).toBe(true);
	});

	it('should have the `container` styles', () => {
		expect(renderedComponent.prop('containerViewStyle')).toEqual(confirmScoreStyles.container);
	});

	it('should call the `onConfirmScores` prop when pressed', () => {
		renderedComponent.simulate('press');

		expect(onConfirmScores.calledOnce).toBe(true);
	});

	it('should have the correct `title` prop', () => {
		const expectedTitle = 'Add Scores';

		expect(renderedComponent.prop('title')).toEqual(expectedTitle);
	});
});
