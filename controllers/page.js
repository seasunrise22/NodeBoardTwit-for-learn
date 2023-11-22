const { User, Twit, Hashtag } = require('../models');

exports.getTwits = async (req, res, next) => {
    try {
        const twits = await Twit.findAll({
            include: [
                {
                    model: User,
                    attributes: ['id', 'nick'],
                },
                {
                    model: Hashtag,
                    attributes: ['title'],
                },
            ],
            order: [['createdAt', 'DESC']],
        });

        return twits;
    } catch (error) {
        console.error(error);
        next();
    }
}

exports.renderMain = async (req, res, next) => {
    try {
        const twits = await Twit.findAll({
            include: [
                {
                    model: User,
                    attributes: ['id', 'nick'],
                },
                {
                    model: Hashtag,
                    attributes: ['title'],
                },
            ],
            order: [['createdAt', 'DESC']],
        });
        res.render('main', {
            title: 'NodeBasicWeb',
            twits: twits,
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.renderJoin = (req, res, next) => {
    res.render('join', {
        title: '회원가입',
    });
};

exports.renderLogin = (req, res, next) => {
    res.render('login', {
        title: '로그인',
    });
}

exports.renderNotice = (req, res, next) => {
    res.render('notice', {
        title: '공지사항',
    });
}

exports.renderJoinAdmin = (req, res, next) => {
    res.render('joinAdmin', {
        title: '관리자 계정 만들기',
    });
}

exports.renderLoginAdmin = (req, res, next) => {
    res.render('loginAdmin', {
        title: '관리자 로그인',
    });
}

exports.renderNoticeWrite = (req, res, next) => {
    res.render('noticeWrite', {
        title: '공지사항 작성',
    });
}