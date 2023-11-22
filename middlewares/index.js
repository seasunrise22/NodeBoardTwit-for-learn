exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(403).send('로그인 필요');
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next();
    } else {
        const message = encodeURIComponent('로그인한 상태입니다.');
        res.redirect(`/?error=${message}`);
    }
};

exports.checkAdminKey = (req, res, next) => {
    const adminKey = req.body.adminKey;
    if (adminKey === '1234') {
        next()
    } else {
        const message = encodeURIComponent('올바르지 않은 인증키입니다.');
        res.redirect(`/joinAdmin?error=${message}`);
    }
}

exports.checkIsAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        // 사용자가 로그인한 상태이고 isAdmin 값이 true인 경우
        next(); // 다음 미들웨어로 진행
    } else {
        res.redirect('/');
    }
}