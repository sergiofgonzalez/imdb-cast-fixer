const tap = require('tap');
const supertest = require('supertest');
const app = require('../src/index');


tap.test(`health-check should return alive signal`, assert => {
  supertest(app)
    .get('/health-check')
    .expect(200)
    .then((response) => {
      assert.equals(response.type, 'application/json');
      assert.ok(response.body);
      assert.equals(response.body.healthy, true);
      assert.type(response.body.timestamp, 'string');
      assert.notThrow(() => Date.parse(response.body.timestamp));
      assert.end();
    });
});
