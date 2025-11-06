jest.mock('../src/id', () => ({
  randomId: jest.fn(() => 'fixed-42')
}));

const { createUser } = require('../src/userService');
const { randomId } = require('../src/id');

test('createUser kasutab mockitud randomId', () => {
  const user = createUser('Ann');

  expect(user.id).toBe('fixed-42');
  expect(randomId).toHaveBeenCalledTimes(1);
});
