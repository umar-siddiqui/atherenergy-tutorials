module.exports = {


  friendlyName: 'Seed api key',


  description: 'Seed data for a ApiKey model',

  exits: {

    success: {
      description: 'Create single record of api key',
    },

  },


  fn: async function (_inputs, exits) {

    await ApiKey.secureCreate('FASDASDASDASD_somerandomkey_34fqfsffwfevvwEWEWQ');

    exits.success();
  }


};

