const Knex = require('knex');

module.exports = {


  friendlyName: 'Create app tables',


  description: 'Create tables tutorial, archive, apikey',


  exits: {

    success: {
      description: 'Created app tables',
    },

  },


  fn: async function (_inputs, exits) {
    const pg = Knex({
      client: 'pg',
      connection: sails.config.datastores.default.url,
      searchPath: ['public']
    });

    const tutorialExists =  await pg.schema.hasTable('tutorial')

    if(!tutorialExists) {
      await pg.schema
        .createTable('tutorial', table => {
          table.increments('id');
          table.text('author');
          table.text('title');
          table.text('status');
          table.text('content');
          table.text('summary');
          table.bigInteger('createdAt');
          table.bigInteger('updatedAt');
        });
    }

    const archiveExists =  await pg.schema.hasTable('archive');

    if(!archiveExists) {
      await pg.schema
              .createTable('archive', table => {
                table.increments('id');
                table.text('fromModel');
                table.json('originalRecord');
                table.json('originalRecordId');
                table.bigInteger('createdAt');
                table.bigInteger('updatedAt');
              });
    }

    const apikeyExists =  await pg.schema.hasTable('apikey');

    if(!apikeyExists) {
      await pg.schema
              .createTable('apikey', table => {
                table.increments('id');
                table.text('key').unique();
                table.bigInteger('createdAt');
                table.bigInteger('updatedAt');
              });
    }

    exits.success();
  }


};

