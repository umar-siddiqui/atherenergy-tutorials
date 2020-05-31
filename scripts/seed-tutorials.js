module.exports = {


  friendlyName: 'Seed tutorials',


  description: 'Seed data for a Tutorial model',


  fn: async function () {

    await sails.helpers.seedTutorials();

  }


};
