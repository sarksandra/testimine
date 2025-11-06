const { greet } = require('../src/greeter');

test('greet uses mocked format function', () => {
  const fn = jest.fn();                        
  fn.mockReturnValue('John Doe');              

  const result = greet(fn, 'John', 'Doe');      

  expect(result).toBe('Hello, John Doe!');      
  expect(fn).toHaveBeenCalledTimes(1);          
  expect(fn).toHaveBeenCalledWith('John', 'Doe'); 
});
