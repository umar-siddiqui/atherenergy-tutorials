const supertest = require('supertest');
const expect = require('chai').expect;

const token = 'FASDASDASDASD_somerandomkey_34fqfsffwfevvwEWEWQ'

describe('TutorialController', function() {

  describe('TutorialController.create', function() {
    it('Should be able to create tutorial.', function (done) {

      supertest(sails.hooks.http.app)
        .post('/tutorial')
        .send({
          "title": "nodejs 103",
          "summary": "nodejs tutorial",
          "author": "Bob Smith",
          "status": "draft",
          "content": "Yo what's up everybody??"
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
        .catch((err) => done(err))

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
        .catch((err) => done(err))

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
                  'content', 'createdAt', 'updatedAtt')

          done();
        })
        .catch((err) => done(err))

    });

  });


});
