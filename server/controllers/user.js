const User = require('../database/models/user');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')

exports.validate = (method) => {
  switch (method) {
    case 'createUser': {
      return [
        check('name', 'Name is required').notEmpty().escape(),
        check('surname', 'Surname is required').notEmpty().escape(),
        check('email', 'Please include a valid email').isEmail().normalizeEmail(),
        check('password', 'Password is required').notEmpty(),
        check('password', 'Please enter a password with 6 or more characters, include a number, capital letter and a symbol')
          .isLength({ min: 6 }).withMessage('Please enter a password with 6 or more characters')
          .matches(/\d/).withMessage('Password mast contain a number')
          .matches(/(?=.*[a-z])(?=.*[A-Z])/).withMessage('Password must contain at least one capital letter and one lowercase letter')
          .matches(/[^A-Za-z0-9]/).withMessage('Password must contain at least a symbol'),
        check('passwordConfirmation')
          .custom(async (passwordConfirmation, { req }) => {
            const password = req.body.password;
            if (password !== passwordConfirmation) {
              throw new Error('Passwords must be same')
            }
          })
      ]
    };
    case 'logUser': {
      return [
        check('email', 'Please include a valid email').isEmail().normalizeEmail(),
        check('password', 'Password is required').notEmpty()
      ]
    }
  }
}

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
    //encrypt password
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
    res.cookie('jwt', token, { expire: new Date() + 1000 });

    const { _id, name, surname, role } = user;
    return res.json({ token, user: { _id, name, surname, email, role } })
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error when signing in user')
  }
} 