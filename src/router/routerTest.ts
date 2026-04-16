import { expect, test } from 'vitest';
import { guess_word } from './wordRoutes.ts';

test('adds 1 + 2 to equal 3', () => {
  expect(guess_word('gru', 'gru')).toBe({0: 'correct', 1: 'correct', 2: 'correct'});
});