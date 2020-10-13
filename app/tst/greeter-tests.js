const tap = require('tap');
const supertest = require('supertest');
const app = require('../src/index');

tap.test(`return 400 when not sending "name" query parameter and expecting text`, assert => {
  supertest(app)
    .get('/')
    .set('Accept', 'text/plain')
    .expect(400)
    .then((response) => {
      assert.equals(response.type, 'text/plain');
      assert.end();
    });
});

tap.test(`return 400 when not sending "name" query parameter and expecting html`, assert => {
  supertest(app)
    .get('/')
    .set('Accept', 'text/html')
    .expect(400)
    .then((response) => {
      assert.equals(response.type, 'text/html');
      assert.end();
    });
});

tap.test(`return 400 when not sending "name" query parameter and expecting json`, assert => {
  supertest(app)
    .get('/')
    .set('Accept', 'application/json')
    .expect(400)
    .then((response) => {
      assert.equals(response.type, 'application/json');
      assert.end();
    });
});


tap.test(`return 406 when request expects a format we don't support`, assert => {
  supertest(app)
    .get('/')
    .set('Accept', 'text/xml')
    .expect(406)
    .then(() => assert.end());
});


tap.test(`return 404 when requesting page that does not exist accepting text`, assert => {
  supertest(app)
    .get('/non-existing')
    .set('Accept', 'text/plain')
    .expect(404)
    .then((response) => {
      assert.equals(response.type, 'text/plain');
      assert.end();
    });
});

tap.test(`return 404 when requesting page that does not exist accepting html`, assert => {
  supertest(app)
    .get('/non-existing')
    .set('Accept', 'text/html')
    .expect(404)
    .then((response) => {
      assert.equals(response.type, 'text/html');
      assert.end();
    });
});

tap.test(`return 404 when requesting page that does not exist accepting json`, assert => {
  supertest(app)
    .get('/non-existing')
    .set('Accept', 'application/json')
    .expect(404)
    .then((response) => {
      assert.equals(response.type, 'application/json');
      assert.end();
    });
});

tap.test(`return 404 when requesting page that exists with an HTTP method we don't support`, assert => {
  supertest(app)
    .post('/')
    .set('Accept', 'text/plain')
    .expect(404)
    .then(() => assert.end());
});


tap.test(`return expected response when sending "name" query parameter`, assert => {
  supertest(app)
    .get('/?name=jason')
    .set('Accept', 'text/plain')
    .expect(200)
    .then((response) => {
      assert.equals(response.type, 'text/plain');
      assert.ok(response.text);
      assert.equals(response.text, `Hello, jason! I'm glad to meet you!`);
      assert.end();
    });
});
