const Sequelize = require('sequelize');

class User extends Sequelize.Model {
    static initiate(sequelize) {
        User.init({
            email: {
                type: Sequelize.STRING(40),
                allowNull: true,
                unique: true,
            },
            nick: {
                type: Sequelize.STRING(15),
                allowNull: false,
            },
            password: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            provider: {
                type: Sequelize.ENUM('local', 'kakao'),
                allowNull: false,
                defaultValue: 'local',
            },
            snsId: {
                type: Sequelize.STRING(30),
                allowNull: true,
            },
            isAdmin: { // 관리자 계정 구분
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
        }, {
            sequelize, // 데이터베이스 연결 정보와 설정이 포함되어 있음. 모델을 초기화할 때 이 객체를 전달하여 모델이 해당 데이터베이스와 연결될 수 있도록 해줌.
            timestamps: true,
            modelName: 'User',
            tableName: 'users',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
        db.User.hasMany(db.Twit);
    }
};

module.exports = User;