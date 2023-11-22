const { User, Twit, Hashtag } = require('../models');

exports.uploadTwit = async (req, res, next) => {
    try {
        const hashtags = req.body.content.match(/#[^\s#]+/g);
        let contentWithoutHashtags = req.body.content;
        if (hashtags) {
            hashtags.forEach(hashtag => {
                contentWithoutHashtags = contentWithoutHashtags.replace(hashtag, '');
            });
            contentWithoutHashtags = contentWithoutHashtags.trim();
        }
        const twit = await Twit.create({
            content: contentWithoutHashtags,
            img: req.body.url,
            UserId: req.user.id,
        });

        if (hashtags) {
            const result = await Promise.all(
                hashtags.map(tag => {
                    return Hashtag.findOrCreate({
                        where: { title: tag.slice(1).toLowerCase() },
                    });
                })
            );
            await twit.addHashtags(result.map(r => r[0]));
        }
        res.redirect('/');
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.getTwits = async (req, res, next) => {
    try {
        const page = req.query.page || 1;
        const limit = 3;
        const offset = (page - 1) * limit;

        const twits = await Twit.findAll({
            include: [
                {
                    model: User,
                    attributes: ['nick'],
                },
                {
                    model: Hashtag,
                    attributes: ['title'],
                },
            ],
            order: [['createdAt', 'DESC']],
            limit,
            offset,
        });

        const totalTwits = await Twit.count();

        // return { twits, totalTwits, limit };

        res.json({ twits, totalTwits, limit });
    } catch (error) {
        console.error(error);
        next(error);
    }
}

exports.getSearchTwits = async (req, res, next) => {
    try {
        const query = req.query.hashtag;
        if (!query) {
            res.status(400).json({ message: '검색어를 입력하세요.' });
        }
        const page = req.query.page || 1;
        const limit = 2;
        const offset = (page - 1) * limit;

        const hashtag = await Hashtag.findOne({ where: { title: query } });
        let twits = [];
        if (hashtag) {
            twits = await hashtag.getTwits({
                include: [
                    {
                        model: User,
                        attributes: ['nick'],
                    },
                    {
                        model: Hashtag,
                        attributes: ['title'],
                    }
                ],
                order: [['createdAt', 'DESC']],
                limit,
                offset,
            });
            const totalTwits = await hashtag.countTwits();

            res.json({ twits, totalTwits, limit });
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
}

exports.afterUploadImage = (req, res) => {
    res.json({
        url: `/img/${req.file.filename}`
    });
}

// exports.renderHashtag = async (req, res, next) => {
//     const query = req.query.hashtag;
//     if (!query) {
//         return res.redirect('/notice');
//     }
//     try {
//         const hashtag = await Hashtag.findOne({ where: { title: query } });
//         let twits = [];
//         if (hashtag) {
//             twits = await hashtag.getTwits({ include: [{ model: User }] });
//         }

//         return res.render('notice', {
//             title: `${query}` | NodeBasicWeb,
//             twits
//         })

//     } catch (error) {
//         console.error(error);
//         return next(error);
//     }
// }