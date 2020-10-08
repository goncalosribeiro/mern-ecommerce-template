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
