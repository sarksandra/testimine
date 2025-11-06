function formatName(first, last) {
  return `${first} ${last}`;
}

function greet(formatFn, first, last) {
  return `Hello, ${formatFn(first, last)}!`;
}

module.exports = { formatName, greet };