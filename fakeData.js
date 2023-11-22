const { Notice } = require('./models');
const { faker } = require('@faker-js/faker');

for (let i = 0; i < 10; i++) {
    const noticeTitle = faker.lorem.sentence();
    const noticeContent = faker.lorem.paragraph();
    Notice.create({
        title: noticeTitle,
        content: noticeContent
    });
}