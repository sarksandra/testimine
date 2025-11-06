const { randomId } = require('./id');

function createUser(name) {
  return { id: randomId(), name };
}

module.exports = { createUser };