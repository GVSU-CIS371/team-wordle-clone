import { expect, test } from 'vitest';
import { guess_word } from './wordRoutes.ts';

test('Test Word', () => {
  expect(guess_word('gru', 'gur')).toEqual({0: 'correct', 1: 'in word', 2: 'in word'});
});