const express = require('express');
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { create } = require('../controllers/product');
const { userById } = require('../controllers/user');
const { validate } = require('../validators/validators');

router.post('/product/create/:userId', requireSignin, isAuth, isAdmin, validate('createProduct'), create)

router.param('userId', userById)

module.exports = router;