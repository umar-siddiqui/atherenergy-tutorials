// const util = require('util');
const assert = require('chai').assert;

const key = 'F79F9D7F98D7FfsafSOMERANDOMKEY535fsdfdsfsd';

describe('ApiKey', () => {

  describe('ApiKey.secureCreate()', () => {
    it('OK, Should create ApiKey record with SHA256 hash string', (done) => {
      ApiKey.secureCreate(key)
            .then((apiKey) => {
              assert.typeOf(apiKey.keyHash, 'string');
              assert.match(apiKey.keyHash, /[a-f0-9]{64}/, 'Is SHA256 hash');
              return done();
            })
            .catch(done);
    });
  });

  describe('ApiKey.verify()', () => {
    it('OK, Should verify true for key from database ApiKey record when same key is passed', (done) => {
      ApiKey.verify(key)
            .then((verified) => {
              assert.typeOf(verified, 'boolean');
              assert.equal(verified, true);
              return done();
            })
            .catch(done);
    });

    it('FAIL, Should verify false for key from database ApiKey record when different key is passed', (done) => {
      const someOtherKey = 'F79F9D7F98D7FfsafSOMEOTHERRANDOMKEY535fsdfdsfsd';
      ApiKey.verify(someOtherKey)
            .then((verified) => {
              assert.typeOf(verified, 'boolean');
              assert.equal(verified, false);
              return done();
            })
            .catch(done);
    });

  });

});
