const {deleteDuplicates, arrayToList, listToArray} = require('../src/RemoveDuplication');

describe('Remove Duplicates from Sorted List', () => {
    test('removes consecutive duplicates from sorted list', () => {
        const input = arrayToList([1, 1, 2, 3, 3]);
        const output = deleteDuplicates(input);
        expect(listToArray(output)).toEqual([1, 2, 3]);
    });

    test('returns the same list if there are no duplicates', () => {
        const input = arrayToList([1, 2, 3]);
        const output = deleteDuplicates(input);
        expect(listToArray(output)).toEqual([1, 2, 3]);
    });
});