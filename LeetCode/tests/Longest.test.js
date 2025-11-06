const {longestCommonPrefix} = require('../src/Longest');

describe('Longest Common Prefix', () => {

    test('First', () => {
        expect(longestCommonPrefix(["flower","flow","flight"])).toBe("fl");
    });
        
    test('Second', () => {
        expect(longestCommonPrefix(["home","education","racecar"])).toBe("");
    });
});