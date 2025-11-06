const { climbStairs } = require('../src/Climbing.js');

describe(' Climbing Stairs', () => {
    test('returns 1 when n = 0', () => {
        expect(climbStairs(0)).toBe(1);
    });

    test('returns 1 when n = 1', () => {
        expect(climbStairs(1)).toBe(1);
    });

    test('returns 2 when n = 2', () => {
        expect(climbStairs(2)).toBe(2);
    });

    test('returns 8 when n = 5', () => {
        expect(climbStairs(5)).toBe(8);
    });

    test('returns 21 when n = 7', () => {
        expect(climbStairs(7)).toBe(21);
    });
});
