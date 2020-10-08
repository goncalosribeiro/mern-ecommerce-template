const express = require('express');
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

//test route
router.get('/hi/:userId', requireSignin, isAuth, isAdmin, (req, res) => {
  console.log('req.auth', req.auth);
  console.log('req.user', req.user);
  console.log('req.profile', req.profile);
  res.json({
    user: req.profile
  })
})

router.param('userId', userById)


module.exports = router;