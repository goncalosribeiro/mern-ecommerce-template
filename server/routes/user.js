const express = require('express');
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { read, update } = require('../controllers/user');
const { userById } = require('../controllers/user');

//test route
router.get('/user/:userId', requireSignin, isAuth, read);
router.put('/user/:userId', requireSignin, isAuth, update)



router.param('userId', userById)

module.exports = router;