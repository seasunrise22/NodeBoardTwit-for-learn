const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/user');

exports.join = async (req, res, next) => {
    const { email, nick, password } = req.body;
    try {
        const exUser = await User.findOne({ where: { email } });
        if (exUser) {
            return res.redirect('/join?error=exist');
        }
        const hash = await bcrypt.hash(password, 12);
        await User.create({
            email,
            nick,
            password: hash,
        });
        return res.redirect('/');
    } catch (error) {
        console.log(error);
        return next(error); // 다음 미들웨어를 건너뛰고 바로 에러처리 미들웨어로 넘김.
    }
};

exports.joinAdmin = async (req, res, next) => {
    const { adminId, adminPassword, nick } = req.body;
    try {
        const exAdmin = await User.findOne({ where: { email: adminId } });
        if (exAdmin) {
            const message = encodeURIComponent('이미 존재하는 관리자아이디 입니다.');
            return res.redirect(`/joinAdmin?error=${message}`);
        }
        const hash = await bcrypt.hash(adminPassword, 12);
        await User.create({
            email: adminId,
            password: hash,
            isAdmin: true,
            nick,
        });
        return res.redirect('/');
    } catch (error) {
        console.log(error);
        return next(error);
    }
}

exports.login = (req, res, next) => {
    // (authError, user, info) 콜백 함수가 호출되는 시점에서는 이미 로컬 전략을 사용하여 사용자 정보 검증이 완료된 상태.
    passport.authenticate('local', (authError, user, info) => {
        if (authError) {
            console.error(authError);
            return next(authError);
        }
        if (!user) {
            return res.redirect(`/?loginError=${info.message}`);
        }
        return req.login(user, (loginError) => {
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/');
        });
    })(req, res, next);
};

exports.loginAdmin = (req, res, next) => {
    passport.authenticate('localAdmin', (authError, user, info) => {
        if (authError) {
            console.error(authError);
            return next(authError);
        }
        if (!user) {
            return res.redirect(`/loginAdmin?loginError=${info.message}`);
        }
        return req.login(user, (loginError) => { // passport.serializeUser 실행되는 시점
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/');
        });
    })(req, res, next); // passport.authenticate() 자체가 미들웨어를 반환하며, 이 미들웨어를 즉시 실행하기 위해 (req, res, next)를 붙입니다.
}

exports.logout = (req, res) => {
    req.logout(() => {
        res.redirect('/');
    });
};

