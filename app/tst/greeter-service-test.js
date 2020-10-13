const tap = require('tap');
const getGreeting = require('../src/services/greeter');


tap.test(`get greeting throws when name is not given`, assert => {
  assert.throws(() => getGreeting(), 'getGreeting fails with validation error when name not given');
  assert.end();
});

tap.test('get greeting returns the expected response message when name is given', assert => {
  const greeting = getGreeting('sergio');
  assert.equals(greeting, `Hello, sergio! I'm glad to meet you!`);
  assert.end();
});