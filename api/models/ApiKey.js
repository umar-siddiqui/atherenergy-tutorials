/**
 * ApiKey.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
const crypto = require('crypto');

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    keyHash: {
      type: 'string',
      required: true,
      unique: true
    }

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

  secureCreate: async (key) => {
    const keyHash = ApiKey.generateHash(key);

    const apiKey = await ApiKey.create({ keyHash }).fetch();

    return apiKey;
  },

  verify: async (key) => {
    const keyHash = ApiKey.generateHash(key);

    const apiKey = await ApiKey.findOne({ keyHash });

    if(!_.isNil(apiKey)) {
      return true;
    }

    return false;
  },

  generateHash: (key) => {
    const keyHash = crypto.createHash('sha256')
                          .update(key)
                          .update(sails.config.custom.apiKeySecret)
                          .digest('hex');

    return keyHash;
  }

};
