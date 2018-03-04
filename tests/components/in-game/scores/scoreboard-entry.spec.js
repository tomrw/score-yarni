import React from 'react';
import { shallow } from 'enzyme';

import ScoreboardEntry from '../../../../src/components/in-game/scores/scoreboard-entry';

import scoreboardEntryStyles from '../../../../src/components/in-game/scores/styles/scoreboard-entry';

describe('Given <ScoreboardEntry />', () => {
	const name = 'Tom';
	const scores = [ 1, 2, 3 ];
	const props = {
		name,
		scores
	};
	const renderedComponent = shallow(<ScoreboardEntry { ...props } />);

	it('should be a `List`', () => {
		expect(renderedComponent.is('List')).toBe(true);
	});

	it('should have the `container` styles', () => {
		expect(renderedComponent.prop('containerStyle')).toEqual(scoreboardEntryStyles.container);
	});

	describe('and its first child', () => {
		const heading = renderedComponent.childAt(0);

		it('should be a `ListItem`', () => {
			expect(heading.is('ListItem')).toBe(true);
		});

		it('should have the players name `title` prop', () => {
			expect(heading.prop('title')).toEqual(name);
		});

		it('should have a `hideChevron` prop', () => {
			expect(heading.prop('hideChevron')).toBe(true);
		});
	});

	describe('when rendering the scores', () => {
		let scoreSubTotal = 0;

		scores.forEach((score, i) => {
			describe(`for the score at index ${ i }`, () => {
				const scoreEntry = renderedComponent.childAt(i + 1);

				beforeAll(() => {
					scoreSubTotal += score;
				});

				it('should be a `ListItem`', () => {
					expect(scoreEntry.is('ListItem')).toBe(true);
				});

				it('should have the correct `key`', () => {
					const expectedKey = i.toString();

					expect(scoreEntry.key()).toEqual(expectedKey);
				});

				it('should have the score subtotal as the `title` prop', () => {
					expect(scoreEntry.prop('title')).toEqual(scoreSubTotal);
				});

				it('should have the score as the `rightTitle` prop', () => {
					const expectedRightTitle = score.toString();

					expect(scoreEntry.prop('rightTitle')).toEqual(expectedRightTitle);
				});

				it('should have a `hideChevron` prop', () => {
					expect(scoreEntry.prop('hideChevron')).toBe(true);
				});
			});
		});
	});

	describe('when reversing the scores', () => {
		const newProps = {
			...props,
			reverse: true
		};
		const renderedComponent = shallow(<ScoreboardEntry { ...newProps } />);
		const sumScores = stopAt => scores.reduce((a, b, index) => {
			if (index >= stopAt) {
				return a;
			}

			return a + b;
		}, 0);

		scores.forEach((score, i) => {
			describe(`for the score at index ${ i }`, () => {
				const expectedScore = sumScores(scores.length - i);
				const scoreEntry = renderedComponent.childAt(i + 1);

				it('should have the score subtotal as the `title` prop', () => {
					expect(scoreEntry.prop('title')).toEqual(expectedScore);
				});
			});
		});
	});
});
