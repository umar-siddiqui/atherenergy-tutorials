const supertest = require('supertest');
const expect = require('chai').expect;

const token = 'FASDASDASDASD_somerandomkey_34fqfsffwfevvwEWEWQ'

describe('TutorialController', function() {

  describe('TutorialController.create', function() {
    it('Should be able to create tutorial.', function (done) {

      supertest(sails.hooks.http.app)
        .post('/tutorial')
        .send({
          title: "nodejs 103",
          summary: "nodejs tutorial",
          author: "Bob Smith",
          status: "draft",
          content: "Yo what's up everybody??"
        })
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .then((res) => {

          expect(res.body)
            .to.be.an('object').that.has.all
            .keys('id', 'title', 'summary', 'author', 'status',
                  'content', 'createdAt', 'updatedAt')

          done();
        })
        .catch(done)

    });

  });

  describe('TutorialController.find', function() {
    it('Should be able to fetch all tutorials.', function (done) {

      supertest(sails.hooks.http.app)
        .get('/tutorial')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .then((res) => {
          expect(res.body).to.be.an('array')

          expect(res.body.length).to.equal(5);

          if(res.body.length > 0) {
            expect(res.body[0])
              .to.be.an('object').that.has.all
              .keys('id', 'title', 'summary', 'author', 'status',
                    'content', 'createdAt', 'updatedAt')
          }

          done();
        })
        .catch(done)

    });

    it('Should be able to fetch all published tutorials.', function (done) {
      const status = 'published'

      supertest(sails.hooks.http.app)
        .get(`/tutorial?status=${status}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .then((res) => {
          expect(res.body).to.be.an('array')

          expect(res.body.length).to.equal(2);

          res.body.forEach((tutorial) => {
            expect(tutorial.status).to.equal(status)
          })

          done();
        })
        .catch(done)

    });
    // Search the tutorials by its name. Like, fetch all the tutorials whose name contains "nodejs".

    it('Should be able to fetch all tutorials that contain "nodejs" in their title.', function (done) {
      const titleContains = 'nodejs'

      supertest(sails.hooks.http.app)
        .get(`/tutorial?title=${titleContains}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .then((res) => {
          expect(res.body).to.be.an('array')

          expect(res.body.length).to.equal(3);

          res.body.forEach((tutorial) => {
            expect(tutorial.title).to.contains(titleContains)
          })

          done();
        })
        .catch(done)

    });

  });

  describe('TutorialController.findOne', function() {
    it('Should be able to fetch a tutorial by its id.', function (done) {
      const tutorialId = 1

      supertest(sails.hooks.http.app)
        .get(`/tutorial/${tutorialId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .then((res) => {

          expect(res.body)
            .to.be.an('object').that.has.all
            .keys('id', 'title', 'summary', 'author', 'status',
                  'content', 'createdAt', 'updatedAt')

          done();
        })
        .catch(done)

    });

  });

  describe('TutorialController.update', function() {
    it('Update the tutorial by the given id.', function (done) {
      const tutorialId = 1

      const tutorialUpdates = {
        summary: "UPDATE nodejs tutorial",
        content: "UPDATE Yo what's up everybody??"
      }

      supertest(sails.hooks.http.app)
        .patch(`/tutorial/${tutorialId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(tutorialUpdates)
        .expect(200)
        .then((res) => {

          expect(res.body)
            .to.be.an('object').that.has.all
            .keys('id', 'title', 'summary', 'author', 'status',
                  'content', 'createdAt', 'updatedAt')

          expect(res.body.summary).to.equal(tutorialUpdates.summary)

          expect(res.body.content).to.equal(tutorialUpdates.content)

          done();
        })
        .catch(done)

    });

  });

  describe('TutorialController.destroy', function() {
    it('Delete the tutorial by the given id.', function (done) {
      const tutorialId = 1

      supertest(sails.hooks.http.app)
        .delete(`/tutorial/${tutorialId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .then((res) => {

          expect(res.body)
            .to.be.an('object').that.has.all
            .keys('id', 'title', 'summary', 'author', 'status',
                  'content', 'createdAt', 'updatedAt')

          supertest(sails.hooks.http.app)
            .delete(`/tutorial/${tutorialId}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(404)
            .then(() => done())
            .catch(done)

        })
        .catch(done)

    });

  });

  describe('TutorialController.destroyAll', function() {
    it('Delete all tutorials.', function (done) {

      supertest(sails.hooks.http.app)
        .post('/tutorial/destroy-all')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .then((res) => {

          supertest(sails.hooks.http.app)
            .get(`/tutorial`)
            .set('Authorization', `Bearer ${token}`)
            .then((res) => {

              expect(res.body).to.be.an('array');

              expect(res.body.length).to.equal(0);

              done();

            }).catch(done)

        }).catch(done)

    });

  });

});
