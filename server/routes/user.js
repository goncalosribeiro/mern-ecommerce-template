const express = require('express');
const router = express.Router();

const { signup, signin, validate } = require('../controllers/user');

router.post('/signup', validate('createUser'), signup)
router.get('/signin', validate('logUser'), signin)

module.exports = router;