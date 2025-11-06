const { getUser } = require('../src/users');

describe('getUser', () => {
  test('successful', async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ id: 1, name: 'Eva' })
    });

    const result = await getUser(1, fetchMock);
    expect(result).toEqual({ id: 1, name: 'Eva' });
    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.example.com/users/1',
      { method: 'GET' }
    );
  });

  test('http error ', async () => {
    const fetchMock = jest.fn().mockResolvedValue({ ok: false, status: 404 });
    await expect(getUser(2, fetchMock)).rejects.toThrow('HTTP 404');
  });

  test('bad shape ', async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ name: 'Missing id' })
    });
    await expect(getUser(3, fetchMock)).rejects.toThrow('Bad shape');
  });
});