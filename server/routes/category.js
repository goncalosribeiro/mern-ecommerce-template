const express = require('express');
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { create } = require('../controllers/category');
const { userById } = require('../controllers/user');
const { validate } = require('../validators/validators');

router.post('/category/create/:userId', requireSignin, isAuth, isAdmin, validate('createCategory'), create)

router.param('userId', userById)

module.exports = router;