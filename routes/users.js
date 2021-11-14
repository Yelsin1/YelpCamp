const express = require('express');
const passport = require('passport');
const User = require('../models/user');
const router = express.Router();
const ExpressError = require('../utills/ExpressError');
const users = require('../controllers/users');

router.route('/register').get(users.renderRegister).post(users.createUser);
router.route('/login').get(users.renderLogin).post(passport.authenticate('local',
{
    failureFlash: true,
    failureRedirect: '/login',
    successFlash: 'Successfully logged In'
}), users.login);

router.get('/logout', users.logout);

module.exports = router;