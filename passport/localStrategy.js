const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/user');

module.exports = () => {
    // passport.use 메소드의 첫 번째 인자로 문자열을 전달하지 않으면, 기본적으로 'local’이 전략의 이름이 된다.
    // 일반 사용자용 로그인
    passport.use('local', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: false,
    }, async (email, password, done) => {
        try {
            const exUser = await User.findOne({ where: { email } });
            if (exUser) {
                const result = await bcrypt.compare(password, exUser.password);
                if (result) {
                    done(null, exUser);
                } else {
                    done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
                }
            } else {
                done(null, false, { message: '가입되지 않은 회원입니다.' });
            }
        } catch (error) {
            console.error(error);
            done(error);
        }
    }));

    // 관리자용 로그인
    passport.use('localAdmin', new LocalStrategy({
        usernameField: 'adminId',
        passwordField: 'adminPassword',
        passReqToCallback: false,
    }, async (adminId, adminPassword, done) => {
        try {
            const exAdmin = await User.findOne({ where: { email: adminId, isAdmin: true } });
            if (exAdmin) {
                const result = await bcrypt.compare(adminPassword, exAdmin.password);
                if (result) {
                    done(null, exAdmin); // (authError, user, info)
                } else {
                    done(null, false, { message: '비밀번호가 일치하지 않습니다.' }); // (authError, user, info)
                }
            } else {
                done(null, false, { message: '등록되지 않은 관리자입니다.' }); // (authError, user, info)
            }
        } catch (error) {
            console.error(error);
            done(error);
        }
    }));
};