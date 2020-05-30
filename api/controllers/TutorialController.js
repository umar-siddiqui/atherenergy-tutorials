/**
 * TutorialController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {


  /**
   * `TutorialController.find()`
   */
  find: async function (req, res) {
    try {
      const tutorials = await sails.helpers.getFilteredTutorials.with(req.query);
      return res.json(tutorials);
    } catch(err) {
      if(err.name === 'UsageError') {
        res.badRequest(err);
      } else {
        res.serverError(err);
      }
    }
  },

  /**
   * `TutorialController.destroyAll()`
   */
  destroyAll: async function (req, res) {
    return res.json({
      todo: 'destroyAll() is not implemented yet!'
    });
  }

};

