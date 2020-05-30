module.exports = async function (req, res, proceed) {

  if (!_.isNil(req.header('authorization'))) {
    const token = req.header('authorization').split('Bearer ')[1];

    const valid = await ApiKey.verify(token);

    if(valid) {
      return proceed();
    }
  }

  return res.sendStatus(401)
};
