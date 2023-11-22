const express = require('express');
const { isLoggedIn, isNotLoggedIn, checkIsAdmin } = require('../middlewares');
const { renderMain, renderJoin, renderLogin, renderNotice, renderJoinAdmin, renderLoginAdmin, renderNoticeWrite } = require('../controllers/page');
const { getTwits } = require('../controllers/twit');
const { User, Twit, Hashtag } = require('../models');

const router = express.Router();

router.use((req, res, next) => {
    res.locals.user = req.user;
    res.locals.followerCount = req.user?.Followers?.length || 0;
    res.locals.followingCount = req.user?.Followings?.length || 0;
    res.locals.followingIdList = req.user?.Followings?.map(f => f.id) || [];
    next();
});

router.get('/', renderMain);
router.get('/join', isNotLoggedIn, renderJoin);
router.get('/login', isNotLoggedIn, renderLogin)
router.get('/notice', renderNotice);
router.get('/joinAdmin', renderJoinAdmin);
router.get('/loginAdmin', renderLoginAdmin);
// router.get('/notice/write', checkIsAdmin, renderNoticeWrite);
router.get('/notice/write', renderNoticeWrite);

module.exports = router;