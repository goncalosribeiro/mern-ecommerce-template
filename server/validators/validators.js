const { check } = require('express-validator');

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