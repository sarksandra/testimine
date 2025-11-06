const { normalizeLettersAndDigits, isPalindromeUnicode, wordCount } = require('../text');

describe('normalizeLettersAndDigits', () => {
  test('Tere, Arge! 123 → terearge123', () => {
    expect(normalizeLettersAndDigits('Tere, Arge! 123')).toBe('terearge123');
  });

  test('Привет, мир! → приветмир', () => {
    expect(normalizeLettersAndDigits('Привет, мир!')).toBe('приветмир');
  });

  test('Aktsendid: Café - café → cafe', () => {
    expect(normalizeLettersAndDigits('Café - café')).toBe('cafecafe');
  });

  test('Kriipsud ja tühikud eemaldatud: Tere, Maailm! 123 → tere123', () => {
    expect(normalizeLettersAndDigits('Tere, Maailm! 123')).toBe('teremaailm123');
  });
});

describe('isPalindromeUnicode', () => {
  test.each([
    ['А роза упала на лапу Азора', true],
    ['Saippuakauppias', true], 
    ['Tere', false], 
  ])('Palindroomi kontroll: %s', (input, expected) => {
    expect(isPalindromeUnicode(input)).toBe(expected);
  });
});

describe('wordCount', () => {
  test('See on lihtne lause → 4', () => {
    expect(wordCount('See on lihtne lause')).toBe(4);
  });

  test('Ночь, улица, фонарь → 3', () => {
    expect(wordCount('Ночь, улица, фонарь')).toBe(3);
  });

  test('Tühi string → 0', () => {
    expect(wordCount('')).toBe(0);
  });

  test('Ainult kirjavahemärgid → 0', () => {
    expect(wordCount('!!!,,,---')).toBe(0);
  });
});
