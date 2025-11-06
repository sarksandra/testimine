const { debounce } = require('../src/debounce');

describe('debounce',  () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  test('debounces calls correctly', async () => {
    const fn = jest.fn();
    const d = debounce(fn, 200);

    d('esimene');
    jest.advanceTimersByTime(100);
    d('teine');
    jest.advanceTimersByTime(100);
    d('kolmas');
    expect(fn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(200);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith('kolmas');
  });
});
