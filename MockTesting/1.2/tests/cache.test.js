const {Cache, Storage} = require('../src/cache')

describe('Cache using spies', () => {
    test('caches value', async () => {
        const storage = new Storage;
        const getSpy = jest.spyOn(storage, 'get')
        const setSpy = jest.spyOn(storage, 'set')

        const cache = new Cache(storage);
        const factory = jest.fn(() => 'abc');

        const first = cache.getOrSet('x', factory);
        expect(first).toBe('abc');
        expect(factory).toHaveBeenCalledTimes(1);
        expect(setSpy).toHaveBeenCalledWith('x', 'abc');

        const second = cache.getOrSet('x', factory);
        expect(second).toBe('abc');
        expect(factory).toHaveBeenCalledTimes(1); 

        getSpy.mockRestore();
        setSpy.mockRestore();
    })
})