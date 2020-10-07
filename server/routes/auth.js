const express = require('express');
const router = express.Router();

const { signup, signin, signout, requireSignin } = require('../controllers/auth');
const { validate } = require('../validators/validators');

router.post('/signup', validate('createUser'), signup)
router.post('/signin', validate('logUser'), signin)
router.get('/signout', signout)

router.get('/hi', requireSignin, (req, res) => {
  res.send('hello')
})

module.exports = router;