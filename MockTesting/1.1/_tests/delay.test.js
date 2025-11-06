const { delayHello } = require('../src/delay');

describe('delayHello', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('delayHello', async () => {
    let done = false;

    const p = delayHello(500);
    p.then(() => {
      done = true;
    });

    expect(done).toBe(false);

    jest.advanceTimersByTime(500);

    const result = await p;

    expect(result).toBe('hello');

    expect(done).toBe(true);
  });
});