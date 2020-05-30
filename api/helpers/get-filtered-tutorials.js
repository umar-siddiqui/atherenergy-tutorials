module.exports = {


  friendlyName: 'Get filtered tutorials',


  description: 'Retrieve a list of filtered tutorials.',


  inputs: {

    title: {
      type: 'string'
    },

    status: {
      type: 'string',
      isIn: ['draft', 'published', 'retracted']
    },

    limit: {
      type: 'number'
    },

    skip: {
      type: 'number'
    },

  },


  exits: {

    success: {
      outputFriendlyName: 'Filtered tutorials',
    },

  },


  fn: async function (inputs, exits) {

    const findQuery = {};

    if(!_.isNil(inputs.title)) {
      findQuery.where = findQuery.where || {};
      findQuery.where.title = { contains: inputs.title };
    }

    if(!_.isNil(inputs.status)) {
      findQuery.where = findQuery.where || {};
      findQuery.where.status = inputs.status;
    }

    let tutorialQuery = Tutorial.find(findQuery);

    if(!_.isNil(inputs.limit)) {
      tutorialQuery = tutorialQuery.limit(inputs.limit);
    }

    if(!_.isNil(inputs.skip)) {
      tutorialQuery = tutorialQuery.skip(inputs.skip);
    }

    const tutorials = await tutorialQuery;

    return exits.success(tutorials);

  }


};

