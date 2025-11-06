jest.mock('fs');
const fs = require('fs');
const { loadConfig } = require('../src/config');

describe('loadConfig with manual mock', () => {
  beforeEach(() => {
    fs.__setFile('cfg.json', JSON.stringify({ port: 3000 }));
  });

  afterEach(() => {
    delete process.env.APP_PORT;
  });

  test('loads config with default port', async () => {
    const cfg = loadConfig('cfg.json');
    expect(cfg).toEqual({ port: 3000 });
  });

  test('overrides port with ENV variable', async () => {
    process.env.APP_PORT = '5555';
    const cfg = loadConfig('cfg.json');
    expect(cfg).toEqual({ port: 5555 });
  });

  test('throws if file not found', async () => {
    expect(() => loadConfig('missing.json')).toThrow('ENOENT');
  });
});
