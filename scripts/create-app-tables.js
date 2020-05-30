const Knex = require('knex');

module.exports = {

  friendlyName: 'Create app tables',

  description: 'DB migration to create table as per model schema.',

  inputs: {
    migrationType: {
      type: 'string',
      defaultsTo: 'up'
    }
  },

  fn: async function ({ migrationType }) {
    const pg = Knex({
      client: 'pg',
      connection: sails.config.datastores.default.url,
      searchPath: ['public']
    });

    if(migrationType === 'up') {
      await pg.schema
              .createTable('tutorial', table => {
                table.increments('id');
                table.text('key');
                table.text('author');
                table.text('title');
                table.text('status');
                table.text('content');
                table.text('summary');
                table.bigInteger('createdAt');
                table.bigInteger('updatedAt');
              });

      await pg.schema
              .createTable('archive', table => {
                table.increments('id');
                table.text('fromModel');
                table.json('originalRecord');
                table.json('originalRecordId');
                table.bigInteger('createdAt');
                table.bigInteger('updatedAt');
              });

      await pg.schema
              .createTable('apikey', table => {
                table.increments('id');
                table.text('key').unique();
                table.bigInteger('createdAt');
                table.bigInteger('updatedAt');
              });

    }
    else if(migrationType === 'down') {
      await pg.schema.dropTable('tutorial');
      await pg.schema.dropTable('archive');
      await pg.schema.dropTable('apikey');
    }

  }

};
