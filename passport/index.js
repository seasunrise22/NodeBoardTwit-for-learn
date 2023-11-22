const passport = require('passport');
const local = require('./localStrategy');
const User = require('../models/user');

module.exports = () => {
    // 사용자 정보를 세션에 저장하는 메서드가 정의됩니다. 이 메서드는 로그인 시(req.login 메서드가 실행될 때) 한 번만 실행됩니다.
    // req.session 객체에 어떤 데이터를 저장할지 정하는 메서드입니다.
    passport.serializeUser((user, done) => {
        done(null, user.id); // user.id를 세션에 저장하도록 합니다.
    });

    // 각 요청마다 실행 됩니다. passport.session 미들웨어가 이 메서드를 호출합니다.
    passport.deserializeUser((id, done) => { // 세션에 저장되어 있던 user.id 가 id가 됩니다.
        User.findOne({ where: { id } }) // 데이터베이스에서 사용자 정보를 조회합니다. 
            .then(user => done(null, user)) // 조회한 정보를 req.user에 저장합니다. req.user를 통해 로그인한 사용자의 정보를 가져올 수 있습니다.
            .catch(err => done(err));
    });

    // 로컬 전략을 설정하는 함수를 호출합니다. 이 함수는 Passport 인증 미들웨어의 로컬 전략을 설정하는 작업을 수행합니다. 
    // 이 함수가 실행되면 로컬 전략이 설정되고, 로그인 요청이 들어오면 이 전략이 사용됩니다.
    local();
};