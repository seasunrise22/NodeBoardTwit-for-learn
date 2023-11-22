const Sequelize = require('sequelize');

class Notice extends Sequelize.Model {
    static initiate(sequelize) {
        Notice.init({
            title: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            content: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            file: {
                type: Sequelize.STRING,
                allowNull: true
            }
        }, {
            sequelize, // 시퀄라이즈 인스턴스. 모델을 데이터베이스와 연결하는 데 사용
            timestamps: true,
            modelName: 'Notice',
            tableName: 'notice',
            paranoid: true,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        })
    }

    static associate(db) {

    }
}

module.exports = Notice;