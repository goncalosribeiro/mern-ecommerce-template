const express = require('express');
const router = express.Router();

const { signup, validate } = require('../controllers/user');

router.post('/signup', validate('createUser'), signup)


module.exports = router;