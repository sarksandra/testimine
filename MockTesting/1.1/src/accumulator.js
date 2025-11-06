function sumBy(calc, arr) {
  return arr.reduce((s, x) => s + calc(x), 0);
}

module.exports = { sumBy };