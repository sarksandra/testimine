function delayHello(ms) {
  return new Promise((resolve) => {
    setTimeout(() => resolve('hello'), ms);
  });
}
module.exports = { delayHello };