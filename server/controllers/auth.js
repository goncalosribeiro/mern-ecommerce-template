const User = require('../database/models/user');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')

exports.signup = async (req, res) => {
  try {
    const errors = validationResult(req);
    const { name, surname, email, password } = req.body;
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    let user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({ errors: [{ param: 'email', msg: 'User already exists' }] })
    }

    user = new User({ name, surname, email, password, });
    const salt = await bcrypt.genSalt(12);
    user.password = await bcrypt.hash(password, salt);

    user.save((err, user) => {
      if (err) {
        return res.status(400).json({ err })
      }
      res.status(200).json({ user })
    })
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error when creating user')
  }
}

exports.signin = async (req, res) => {
  try {
    const { password, email } = req.body;
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] })
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] })
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.cookie('jwt', token, { maxAge: 2 * 60 * 60 * 1000, httpOnly: true });

    const { _id, name, surname, role } = user;
    return res.json({ token, user: { _id, name, surname, email, role } })
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error when signing in user')
  }
}

exports.signout = (req, res) => {
  res.clearCookie('jwt');
  res.json({ msg: 'Signed out successfully' })
}

//Access to any register user exclusive pages
exports.requireSignin = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) return res.status(401).json({ error: 'Please SignIn' })
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Session no longer valid' })
    req.auth = user;
    next();
  })
}

//Access to user exclusive pages
exports.isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id
  if (!user) {
    return res.status(403).json({ error: 'Access denied' })
  }
  next();
}

//Access to admin exclusive pages
exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({ error: 'Access denied. Admin credentials necessary' })
  }
  next();
}

