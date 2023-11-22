const Sequelize = require('sequelize');

class Twit extends Sequelize.Model {
    static initiate(sequelize) {
        Twit.init({
            content: { // 게시글 내용
                type: Sequelize.STRING(140),
                allowNull: false,
            },
            img: { // 이미지 경로
                type: Sequelize.STRING(200),
                allowNull: true,
            },
        }, {
            sequelize,
            timestamps: true,
            modelName: 'Twit',
            tableName: 'twits',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        db.Twit.belongsTo(db.User);
        db.Twit.belongsToMany(db.Hashtag, { through: 'TwitHashtag' });
    }
}

module.exports = Twit;