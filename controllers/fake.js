const { Notice } = require('../models');
const { faker } = require('@faker-js/faker');

exports.uploadFakeNotice = async (req, res, next) => {
    try {
        for (let i = 0; i < 100; i++) {
            const noticeTitle = faker.lorem.sentence();
            const noticeContent = faker.lorem.paragraph();
            await Notice.create({
                title: noticeTitle,
                content: noticeContent
            });
        }

        // Notice.create({
        //     title: 'dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd',
        //     content: 'zzzzzzzzzzzzzzzzzz',
        // });
        res.json({ message: 'Fake 데이터가 성공적으로 등록되었습니다.' });
    } catch (error) {
        console.error(error);
        next(error);
    }
}
