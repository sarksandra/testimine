const { sumBy } = require('../src/accumulator');

test('sumBy', () => {
    const calc = jest.fn();
    calc.mockReturnValueOnce(10).mockReturnValueOnce(20).mockReturnValue(1);

    const result = sumBy(calc, [5,6,7,8]);
    
    expect(result).toBe(32);
    expect(calc).toHaveBeenCalledTimes(4); 

    expect(calc).toHaveBeenNthCalledWith(1, 5);
    expect(calc).toHaveBeenNthCalledWith(2, 6);
    expect(calc).toHaveBeenNthCalledWith(3, 7);
    expect(calc).toHaveBeenNthCalledWith(4, 8);  
})