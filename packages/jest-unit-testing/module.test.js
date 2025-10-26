// module.test.js
import mut from './module.js'; // MUT = Module Under Test

test('Testing sum -- success', () => {
  const expected = 30;
  const got = mut.sum(12, 18);
  expect(got).toBe(expected);
});

test('sum should correctly add two numbers', () => {
    expect(mut.sum(3, 4)).toBe(7);
    expect(mut.sum(-2, 5)).toBe(3);
    expect(mut.sum(0, 0)).toBe(0);
  });

test('div should correctly divide two numbers', () => {
  expect(mut.div(10, 2)).toBe(5);
  expect(mut.div(-6, 3)).toBe(-2);
});

test('div should return Infinity when dividing by zero', () => {
  expect(mut.div(5, 0)).toBe(Infinity);
});

test('containsNumbers should detect when text contains numbers', () => {
  expect(mut.containsNumbers('abc123')).toBe(true);
  expect(mut.containsNumbers('4you')).toBe(true);
});

test('containsNumbers should return false when there are no numbers', () => {
  expect(mut.containsNumbers('hello')).toBe(false);
  expect(mut.containsNumbers('')).toBe(false);
});