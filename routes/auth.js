const express = require('express');
const passport = require('passport');

const { isLoggedIn, isNotLoggedIn, checkAdminKey } = require('../middlewares');
const { join, login, logout, joinAdmin, loginAdmin } = require('../controllers/auth');

const router = express.Router();

router.post('/join', isNotLoggedIn, join);
router.post('/login', isNotLoggedIn, login);
router.get('/logout', isLoggedIn, logout);

router.post('/joinAdmin', checkAdminKey, joinAdmin);
router.post('/loginAdmin', isNotLoggedIn, loginAdmin);

module.exports = router;