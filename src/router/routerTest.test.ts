import { expect, test } from 'vitest';
import { create_word, guess_word, get_word } from './wordRoutes.ts';

test('Test Word', () => {
  expect(guess_word('gru', 'gur')).toEqual({0: 'correct', 1: 'in word', 2: 'in word'});
});

test('Test DB', async () => {
  create_word('today');
  const test: string = await get_word('today');
  console.log(test);
  expect(test).toBe(await get_word('today'));
});