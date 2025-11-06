const {lengthOfLastWord} = require('../src/Lenght')

describe(' Length of Last Word', () => {

    test('lenght of last word', () => {
        expect(lengthOfLastWord('Hello world')).toBe(5);
    });

    test('lenght of last word', () => {
        expect(lengthOfLastWord('Minu nimi on Mihkel')).toBe(6);
    });
});