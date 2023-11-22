const Sequelize = require('sequelize');
const User = require('./user');
const Twit = require('./twit');
const Hashtag = require('./hashtag');
const Notice = require('./notice');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const db = {};
const sequelize = new Sequelize(
  config.database, config.username, config.password, config
);

db.sequelize = sequelize;
db.User = User;
db.Twit = Twit;
db.Hashtag = Hashtag;
db.Notice = Notice;

// 모델과 시퀄라이즈의 연결(이후 sequelize.sync() 호출시 실제 디비와 동기화)
User.initiate(sequelize);
Twit.initiate(sequelize);
Hashtag.initiate(sequelize);
Notice.initiate(sequelize);

User.associate(db);
Twit.associate(db);
Hashtag.associate(db);
Notice.associate(db);

module.exports = db;
