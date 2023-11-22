const { Notice } = require('../models')
const moment = require('moment');
const path = require('path');

exports.uploadNotice = async (req, res, next) => {
    try {
        await Notice.create({
            title: req.body.noticeTitle,
            content: req.body.noticeContent,
            file: req.body.url,
        });
        res.redirect('/notice');
    } catch (error) {
        console.error(error);
        next(error);
    }
}

exports.getNoticePosts = async (req, res, next) => {
    try {
        const page = req.query.page || 1;
        const limit = 10;
        const offset = (page - 1) * limit;

        const posts = await Notice.findAll({
            order: [
                ['createdAt', 'DESC']
            ],
            limit,
            offset,
        });
        const totalPosts = await Notice.count();

        const formattedPosts = posts.map(post => {
            const postDate = moment(post.createdAt); // 모먼트 객체로 변환
            const formattedDate = postDate.isSame(moment(), 'day') ? postDate.format('HH:mm') : postDate.format('YYYY-MM-DD');
            return { ...post.dataValues, createdAt: formattedDate };
        });

        res.json({ formattedPosts, totalPosts, limit });
    } catch (error) {
        console.error(error);
        next(error);
    }
}

exports.getNoticeOnePost = async (req, res, next) => {
    try {
        const post = await Notice.findOne({ where: { id: req.params.id } });
        res.render('noticeRead', {
            title: post.title,
            content: post.content,
            file: post.file,
        });
    } catch (error) {
        console.error(error)
        next(error);
    }
}

exports.uploadNoticePost = async (req, res, next) => {
    try {

    } catch (error) {
        console.error(error);
        next(error);
    }
}

exports.afterUploadFile = (req, res, next) => {
    res.json({
        url: `/file/${req.file.filename}`
    });
}

exports.fileDownload = (req, res, next) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, '../uploads/files', filename);
    res.download(filePath);
}