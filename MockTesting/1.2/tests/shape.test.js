const { normalizeUser } = require('../src/shape');

describe('normalizeUser', () => {
  test('normalizes valid input', async () => {
    const raw = { id: '42', name: '  Ann  ', tags: ['x'], extra: true };
    const result = normalizeUser(raw);
    expect(result).toEqual(expect.objectContaining({
      id: expect.any(Number),
      name: expect.any(String),
      tags: expect.arrayContaining(['x'])
    }));
})});
