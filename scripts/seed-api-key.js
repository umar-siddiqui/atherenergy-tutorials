module.exports = {


  friendlyName: 'Seed api key',


  description: 'Seed data for a ApiKey model',


  fn: async function () {
    await sails.helpers.seedApiKey();
  }


};

