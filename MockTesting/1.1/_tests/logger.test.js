const { logger, doWork } = require('../src/logger');

test('spyOn', () => {
  const spy = jest.spyOn(logger, 'info');

  const result = doWork();

  expect(result).toBe(true);
  expect(spy).toHaveBeenCalledTimes(2);
  expect(spy).toHaveBeenNthCalledWith(1, 'started');
  expect(spy).toHaveBeenNthCalledWith(2, 'finished');

  spy.mockRestore();
});