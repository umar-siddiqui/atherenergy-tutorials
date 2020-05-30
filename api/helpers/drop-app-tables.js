const Knex = require('knex');

module.exports = {


  friendlyName: 'Drop app tables',


  description: 'Drop tables tutorial, archive, apikey',


  exits: {

    success: {
      description: 'Droped app tables',
    },

  },


  fn: async function (_inputs, exits) {
    const pg = Knex({
      client: 'pg',
      connection: sails.config.datastores.default.url,
      searchPath: ['public']
    });

    await pg.schema.dropTableIfExists('tutorial');
    await pg.schema.dropTableIfExists('archive');
    await pg.schema.dropTableIfExists('apikey');

    exits.success();
  }


};

