const { sum, max, isEven } = require('../math');

describe('sum', () => {
    test('positiivsed arvud', () => {
        expect(sum(2, 3)).toBe(5);
    });

    test('negatiivsed arvud', () => {
        expect(sum(-2, -3)).toBe(-5);
    });

    test('null väärtus', () => {
        expect(sum(0, 5)).toBe(5);
    });

    test('argumentideks on mitte-arvud', () => {
        expect(() => sum('2', 3)).toThrow('Argumente peavad olema ainult numbrid.');
        expect(() => sum(NaN, 3)).toThrow('Argumente peavad olema ainult numbrid.');
    });

    test('kombineeritud positiivne ja negatiivne', () => {
        expect(sum(10, -3)).toBe(7);
    });
});

describe('max', () => {
    test('kõrgeim väärtus', () => {
        expect(max(5, 8)).toBe(8);
    });

    test('väärtused on võrdsed', () => {
        expect(max(3, 3)).toBe(3);
    });

    test('negatiivsed väärtused', () => {
        expect(max(-2, -8)).toBe(-2);
    });

    test('äärmuslikud väärtused', () => {
        expect(max(Number.MAX_VALUE, Number.MIN_VALUE)).toBe(Number.MAX_VALUE);
    });
});

describe('isEven', () => {
    test('paaris number', () => {
        expect(isEven(4)).toBe(true);
    });

    test('paaris negatiivne number', () => {
        expect(isEven(-2)).toBe(true);
    });

    test('paaritu number', () => {
        expect(isEven(3)).toBe(false);
    });

    test('paaritu negatiivne number', () => {
        expect(isEven(-3)).toBe(false);
    });

    test('mitte täisarv', () => {
        expect(() => isEven(2.5)).toThrow('Sisend peab olema täisarv.');
    });
});
