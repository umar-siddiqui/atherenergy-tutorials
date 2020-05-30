module.exports = async function (req, res, proceed) {

  if (!_.isNil(req.header('authorization'))) {
    const token = req.header('authorization').split('Bearer ')[1];

    const apiKey = await ApiKey.findOne({ key: token });

    if(!_.isNil(apiKey)) {
      return proceed();
    }
  }

  return res.forbidden();
};
