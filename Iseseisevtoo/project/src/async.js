function safeDivide(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    return Promise.reject(new Error('Both arguments must be numbers'));
  }
  if (b === 0) {
    return Promise.reject(new Error('Cannot divide by zero'));
  }
  return Promise.resolve(a / b);
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function retry(fn, attempts) {
  return new Promise((resolve, reject) => {
    let attempt = 0;

    function attemptFn() {
      attempt++;
      fn()
        .then(resolve)
        .catch((error) => {
          if (attempt < attempts) {
            attemptFn();
          } else {
            reject(error);
          }
        });
    }

    attemptFn();
  });
}

module.exports = { retry };

function fetchUser(fakeApi, id) {
  return fakeApi.getUser(id)
    .then(response => response)
    .catch(error => { throw error; });
}

module.exports = { safeDivide, delay, retry, fetchUser };
