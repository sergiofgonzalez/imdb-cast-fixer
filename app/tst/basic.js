const tap = require('tap');
const app = require('../src/index');

tap.test('app can be loaded', assert => {
  assert.ok(app, 'app is not null');
  assert.end();
});