const { safeDivide, delay, retry, fetchUser } = require('../async');

describe('safeDivide', () => {
  test('Jagab korrektseid arve', async () => {
    await expect(safeDivide(6, 2)).resolves.toBe(3);
  });

  test('Viskab vea nulliga jagamisel', async () => {
    await expect(safeDivide(6, 0)).rejects.toThrow('Cannot divide by zero');
  });

  test('Viskab vea, kui argumendid ei ole numbrid', async () => {
    await expect(safeDivide(6, 'a')).rejects.toThrow('Both arguments must be numbers');
    await expect(safeDivide('a', 2)).rejects.toThrow('Both arguments must be numbers');
    await expect(safeDivide('a', 'b')).rejects.toThrow('Both arguments must be numbers');
  });
});

describe('delay', () => {
  test('Viivitus töötab õigesti kasutades fake taimerit', async () => {
    jest.useFakeTimers();
    
    const delayPromise = delay(1000);
    jest.advanceTimersByTime(1000);

    await expect(delayPromise).resolves.toBeUndefined();
    jest.useRealTimers();
  });
});

describe('retry', () => {
  test('Kutsuge fn mitu korda kuni see õnnestub', async () => {
    const fn = jest.fn()
      .mockRejectedValueOnce('error')
      .mockRejectedValueOnce('error') 
      .mockResolvedValue('success'); 

    await expect(retry(fn, 3)).resolves.toBe('success');
    expect(fn).toHaveBeenCalledTimes(3);
  });
});

describe('fetchUser', () => {
  test('Edulugu: resolve objektiga { id, name }', async () => {
    const fakeApi = {
      getUser: jest.fn().mockResolvedValue({ id: 1, name: 'John Doe' }),
    };

    await expect(fetchUser(fakeApi, 1)).resolves.toEqual({ id: 1, name: 'John Doe' });
    expect(fakeApi.getUser).toHaveBeenCalledWith(1);
  });

  test('Tõrge: viskab vea, kui promise tagastab vea', async () => {
    const fakeApi = {
      getUser: jest.fn().mockRejectedValue(new Error('User not found')),
    };

    await expect(fetchUser(fakeApi, 1)).rejects.toThrow('User not found');
    expect(fakeApi.getUser).toHaveBeenCalledWith(1);
  });
});
