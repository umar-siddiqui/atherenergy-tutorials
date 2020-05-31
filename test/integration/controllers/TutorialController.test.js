const supertest = require('supertest');
const expect = require('chai').expect;

let apiKey = '';

describe('TutorialController', () => {

  before((done) => {
    apiKey = sails.config.custom.apiKeyForTests;
    done();
  });

  describe('TutorialController.create', () => {
    it('OK, Should be able to create tutorial.', (done) => {

      supertest(sails.hooks.http.app)
        .post('/api/v1/tutorial')
        .send({
          title: 'nodejs 103',
          summary: 'nodejs tutorial',
          author: 'Bob Smith',
          status: 'draft',
          content: 'Yo what\'s up everybody?'
        })
        .set('Authorization', `Bearer ${apiKey}`)
        .expect(200)
        .then((res) => {

          expect(res.body)
            .to.be.an('object').that.has.all
            .keys('id', 'title', 'summary', 'author', 'status',
                  'content', 'createdAt', 'updatedAt');

          done();
        })
        .catch(done);

    });

    it('FAIL, Should fail(400) to create tutorial when title not passed.', (done) => {

      supertest(sails.hooks.http.app)
        .post('/api/v1/tutorial')
        .send({
          summary: 'nodejs tutorial',
          author: 'Bob Smith',
          status: 'draft',
          content: 'Yo what\'s up everybody?'
        })
        .set('Authorization', `Bearer ${apiKey}`)
        .expect(400)
        .then(() => done())
        .catch(done);

    });

    it('FAIL, Should fail(400) to create tutorial when status is other then draft, published, retracted.', (done) => {

      supertest(sails.hooks.http.app)
        .post('/api/v1/tutorial')
        .send({
          title: 'nodejs 101',
          author: 'Bob Smith',
          status: 'created',
        })
        .set('Authorization', `Bearer ${apiKey}`)
        .expect(400)
        .then(() => done())
        .catch(done);

    });

  });

  describe('TutorialController.find', () => {
    it('OK, Should be able to fetch all tutorials.', (done) => {

      supertest(sails.hooks.http.app)
        .get('/api/v1/tutorial')
        .set('Authorization', `Bearer ${apiKey}`)
        .expect(200)
        .then((res) => {
          expect(res.body).to.be.an('array');

          expect(res.body.length).to.equal(5);

          if(res.body.length > 0) {
            expect(res.body[0])
              .to.be.an('object').that.has.all
              .keys('id', 'title', 'summary', 'author', 'status',
                    'content', 'createdAt', 'updatedAt');
          }

          done();
        })
        .catch(done);

    });

    it('OK, Should be able to fetch all published tutorials.', (done) => {
      const status = 'published';

      supertest(sails.hooks.http.app)
        .get(`/api/v1/tutorial?status=${status}`)
        .set('Authorization', `Bearer ${apiKey}`)
        .expect(200)
        .then((res) => {
          expect(res.body).to.be.an('array');

          expect(res.body.length).to.equal(2);

          res.body.forEach((tutorial) => {
            expect(tutorial.status).to.equal(status);
          });

          done();
        })
        .catch(done);

    });

    it('OK, Should be able to fetch all tutorials that contain "nodejs" in their title.', (done) => {
      const titleContains = 'nodejs';

      supertest(sails.hooks.http.app)
        .get(`/api/v1/tutorial?title=${titleContains}`)
        .set('Authorization', `Bearer ${apiKey}`)
        .expect(200)
        .then((res) => {
          expect(res.body).to.be.an('array');

          expect(res.body.length).to.equal(3);

          res.body.forEach((tutorial) => {
            expect(tutorial.title).to.contains(titleContains);
          });

          done();
        })
        .catch(done);

    });

    it('FAIL, Should fail(400) when trying to fetch tutorials of status is other then draft, published, retracted.', (done) => {
      const status = 'created';

      supertest(sails.hooks.http.app)
        .get(`/api/v1/tutorial?status=${status}`)
        .set('Authorization', `Bearer ${apiKey}`)
        .expect(400)
        .then(() => done())
        .catch(done);

    });

    it('FAIL, Should fail(400) to fetch tutorial when limt params is alphanumeric', (done) => {
      const limit = '1a';

      supertest(sails.hooks.http.app)
        .get(`/api/v1/tutorial?limit=${limit}`)
        .set('Authorization', `Bearer ${apiKey}`)
        .expect(400)
        .then(() => done())
        .catch(done);

    });

  });

  describe('TutorialController.findOne', () => {
    it('OK, Should be able to fetch a tutorial by its id.', (done) => {
      const tutorialId = 1;

      supertest(sails.hooks.http.app)
        .get(`/api/v1/tutorial/${tutorialId}`)
        .set('Authorization', `Bearer ${apiKey}`)
        .expect(200)
        .then((res) => {

          expect(res.body)
            .to.be.an('object').that.has.all
            .keys('id', 'title', 'summary', 'author', 'status',
                  'content', 'createdAt', 'updatedAt');

          done();
        })
        .catch(done);

    });

    it('FAIL, Should fail(404) when tutorial with id not present.', (done) => {
      const tutorialId = 9999;

      supertest(sails.hooks.http.app)
        .get(`/api/v1/tutorial/${tutorialId}`)
        .set('Authorization', `Bearer ${apiKey}`)
        .expect(404)
        .then(() => done())
        .catch(done);

    });

    it('FAIL, Should fail(400) when tutorial id is alphanumeric.', (done) => {
      const tutorialId = '1a';

      supertest(sails.hooks.http.app)
        .get(`/api/v1/tutorial/${tutorialId}`)
        .set('Authorization', `Bearer ${apiKey}`)
        .expect(400)
        .then(() => done())
        .catch(done);

    });

  });

  describe('TutorialController.update', () => {
    it('OK, Should updating the tutorial by the given id.', (done) => {
      const tutorialId = 1;

      const tutorialUpdates = {
        summary: 'UPDATE nodejs tutorial',
        content: 'UPDATE Yo what\'s up everybody?'
      };

      supertest(sails.hooks.http.app)
        .patch(`/api/v1/tutorial/${tutorialId}`)
        .set('Authorization', `Bearer ${apiKey}`)
        .send(tutorialUpdates)
        .expect(200)
        .then((res) => {

          expect(res.body)
            .to.be.an('object').that.has.all
            .keys('id', 'title', 'summary', 'author', 'status',
                  'content', 'createdAt', 'updatedAt');

          expect(res.body.summary).to.equal(tutorialUpdates.summary);

          expect(res.body.content).to.equal(tutorialUpdates.content);

          done();
        })
        .catch(done);

    });

    it('FAIL, Should fail(404) updating the tutorial id which is not present.', (done) => {
      const tutorialId = 999;

      const tutorialUpdates = {};

      supertest(sails.hooks.http.app)
        .patch(`/api/v1/tutorial/${tutorialId}`)
        .set('Authorization', `Bearer ${apiKey}`)
        .send(tutorialUpdates)
        .expect(404)
        .then(() => done())
        .catch(done);

    });

    it('FAIL, Should fail(400) updating the tutorial id which is alphanumeric.', (done) => {
      const tutorialId = '1a';

      const tutorialUpdates = {};

      supertest(sails.hooks.http.app)
        .patch(`/api/v1/tutorial/${tutorialId}`)
        .set('Authorization', `Bearer ${apiKey}`)
        .send(tutorialUpdates)
        .expect(400)
        .then(() => done())
        .catch(done);

    });

  });

  describe('TutorialController.destroy', () => {
    it('OK, Delete the tutorial by the given id.', (done) => {
      const tutorialId = 1;

      supertest(sails.hooks.http.app)
        .delete(`/api/v1/tutorial/${tutorialId}`)
        .set('Authorization', `Bearer ${apiKey}`)
        .expect(200)
        .then((res) => {

          expect(res.body)
            .to.be.an('object').that.has.all
            .keys('id', 'title', 'summary', 'author', 'status',
                  'content', 'createdAt', 'updatedAt');

          supertest(sails.hooks.http.app)
            .delete(`/api/v1/tutorial/${tutorialId}`)
            .set('Authorization', `Bearer ${apiKey}`)
            .expect(404)
            .then(() => done())
            .catch(done);

        })
        .catch(done);

    });

    it('FAIL, Should fail(404) to delete the tutorial with tutorial id not present.', (done) => {
      const tutorialId = 1;

      supertest(sails.hooks.http.app)
        .delete(`/api/v1/tutorial/${tutorialId}`)
        .set('Authorization', `Bearer ${apiKey}`)
        .expect(404)
        .then(() => done())
        .catch(done);

    });

  });

  describe('TutorialController.destroyAll', () => {
    it('OK, Delete all tutorials.', (done) => {

      supertest(sails.hooks.http.app)
        .post('/api/v1/tutorial/destroy-all')
        .set('Authorization', `Bearer ${apiKey}`)
        .expect(200)
        .then(() => {

          supertest(sails.hooks.http.app)
            .get(`/api/v1/tutorial`)
            .set('Authorization', `Bearer ${apiKey}`)
            .then((res) => {

              expect(res.body).to.be.an('array');

              expect(res.body.length).to.equal(0);

              done();

            }).catch(done);

        }).catch(done);

    });


    it('FAIL, Should fail(401) to Delete all tutorials when apiKeyapiKey not present.', (done) => {

      supertest(sails.hooks.http.app)
        .post('/api/v1/tutorial/destroy-all')
        // .set('Authorization', `Bearer ${apiKey}`)
        .expect(401)
        .then(() => done()).catch(done);

    });

  });

});
