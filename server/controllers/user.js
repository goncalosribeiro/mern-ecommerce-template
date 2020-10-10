const User = require('../database/models/user');

exports.userById = async (req, res, next, id) => {
  try {
    const user = await User.findById(id)
    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'User not found' }] })
    }
    req.profile = user;
    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error when making Id check')
  }
}

exports.read = (req, res) => {
  req.profile.password = undefined;
  return res.json(req.profile)
}

exports.update = (req, res) => {
  User.findByIdAndUpdate({ _id: req.profile._id }, { $set: req.body }, { new: true }, ((err, user) => {
    if (err) {
      return res.status(400).json({ errors: [{ error: 'Authorization denied' }] })
    }
    user.password = undefined;
    res.json(user);
  }
  ))
}