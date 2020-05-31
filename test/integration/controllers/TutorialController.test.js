const supertest = require('supertest');
const expect = require('chai').expect;

const token = 'FASDASDASDASD_somerandomkey_34fqfsffwfevvwEWEWQ';

describe('TutorialController', () => {

  describe('TutorialController.create', () => {
    it('Should be able to create tutorial.', (done) => {

      supertest(sails.hooks.http.app)
        .post('/api/v1/tutorial')
        .send({
          title: 'nodejs 103',
          summary: 'nodejs tutorial',
          author: 'Bob Smith',
          status: 'draft',
          content: 'Yo what\'s up everybody?'
        })
        .set('Authorization', `Bearer ${token}`)
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

  });

  describe('TutorialController.find', () => {
    it('Should be able to fetch all tutorials.', (done) => {

      supertest(sails.hooks.http.app)
        .get('/api/v1/tutorial')
        .set('Authorization', `Bearer ${token}`)
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

    it('Should be able to fetch all published tutorials.', (done) => {
      const status = 'published';

      supertest(sails.hooks.http.app)
        .get(`/api/v1/tutorial?status=${status}`)
        .set('Authorization', `Bearer ${token}`)
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

    it('Should be able to fetch all tutorials that contain "nodejs" in their title.', (done) => {
      const titleContains = 'nodejs';

      supertest(sails.hooks.http.app)
        .get(`/api/v1/tutorial?title=${titleContains}`)
        .set('Authorization', `Bearer ${token}`)
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

  });

  describe('TutorialController.findOne', () => {
    it('Should be able to fetch a tutorial by its id.', (done) => {
      const tutorialId = 1;

      supertest(sails.hooks.http.app)
        .get(`/api/v1/tutorial/${tutorialId}`)
        .set('Authorization', `Bearer ${token}`)
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

  });

  describe('TutorialController.update', () => {
    it('Update the tutorial by the given id.', (done) => {
      const tutorialId = 1;

      const tutorialUpdates = {
        summary: 'UPDATE nodejs tutorial',
        content: 'UPDATE Yo what\'s up everybody?'
      };

      supertest(sails.hooks.http.app)
        .patch(`/api/v1/tutorial/${tutorialId}`)
        .set('Authorization', `Bearer ${token}`)
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

  });

  describe('TutorialController.destroy', () => {
    it('Delete the tutorial by the given id.', (done) => {
      const tutorialId = 1;

      supertest(sails.hooks.http.app)
        .delete(`/api/v1/tutorial/${tutorialId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .then((res) => {

          expect(res.body)
            .to.be.an('object').that.has.all
            .keys('id', 'title', 'summary', 'author', 'status',
                  'content', 'createdAt', 'updatedAt');

          supertest(sails.hooks.http.app)
            .delete(`/api/v1/tutorial/${tutorialId}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(404)
            .then(() => done())
            .catch(done);

        })
        .catch(done);

    });

  });

  describe('TutorialController.destroyAll', () => {
    it('Delete all tutorials.', (done) => {

      supertest(sails.hooks.http.app)
        .post('/api/v1/tutorial/destroy-all')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .then(() => {

          supertest(sails.hooks.http.app)
            .get(`/api/v1/tutorial`)
            .set('Authorization', `Bearer ${token}`)
            .then((res) => {

              expect(res.body).to.be.an('array');

              expect(res.body.length).to.equal(0);

              done();

            }).catch(done);

        }).catch(done);

    });

  });

});
