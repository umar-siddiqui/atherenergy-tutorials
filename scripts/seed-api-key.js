module.exports = {


  friendlyName: 'Seed api key',


  description: 'Seed data for a ApiKey model',


  fn: async function () {

    await ApiKey.create({
      key: 'FASDASDASDASD_somerandomkey_34fqfsffwfevvwEWEWQ'
    });

  }


};

