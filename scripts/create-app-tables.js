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

    if(migrationType === 'up') {
      await sails.helpers.createAppTables();
    }
    else if(migrationType === 'down') {
      await sails.helpers.dropAppTables();
    }

  }

};
