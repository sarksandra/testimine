function normalizeLettersAndDigits(s) {
  return s
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]/gu, '') 
    .normalize('NFKD') 
    .replace(/\p{Mn}/gu, '')
}

function isPalindromeUnicode(s) {
  const normalized = normalizeLettersAndDigits(s);
  const reversed = normalized.split('').reverse().join('');
  return normalized === reversed;
}

function wordCount(s) {
  const words = s.match(/\p{L}+/gu) || []; 
  return words.length;
}

module.exports = { normalizeLettersAndDigits, isPalindromeUnicode, wordCount };
